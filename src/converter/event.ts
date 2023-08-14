import { abi } from 'thor-devkit'

type Unit = 'block' | 'time'
type Range = {
  unit: Unit
  from: number
  to: number
}

export default class BaseEvent {
  private address: string
  private events: abi.Event.Definition[]

  constructor(address: string, events: abi.Event.Definition[]) {
    this.address = address
    this.events = events
  }

  private formatRange (range: Range) {
    return range ? {
      clause: {
        tx: {
          block: {
            [range.unit === 'block' ? 'number' : 'timestamp']: {
              gte: range.from,
              lte: range.to
            }
          }
        }
      }
    } : undefined
  }

  private formatFilter (name: string, filter: Record<string, string> | null) {
    const eventAbi = this.events.find(e => e.name === name)
    const event = new abi.Event(eventAbi)
    let result = {
      contractAddr: {
        equals: this.address
      }
    }

    const encoded = event.encode(filter || {})
    encoded.forEach((item, index) => {
      if (item) {
        result[`topic${index}`] = {}
        result[`topic${index}`]['equals'] = item
      }
    })

    return result
  }
  
  public async query (eventName: string, filter: Record<string, string>, range: Range, skip: number = 0, take: number = 10, order: 'desc' | 'asc', dbIndtance) {
    const ff = this.formatFilter(eventName, filter)
    const rangeFilter = this.formatRange(range)
    const temp = await dbIndtance.event.findMany({
      where: {
        AND: [rangeFilter, ff],
      },
      select: {
        id: true,
        contractAddr: true,
        data: true,
        topic0: true,
        topic1: true,
        topic2: true,
        topic3: true,
        topic4: true
      },
      orderBy: {
        createdAt: order!
      },
      skip: skip!,
      take: take!
    })
    const eventAbi = this.events.find(e => e.name === eventName)
    const ev = new abi.Event(eventAbi)
    return temp.map(item => {
      return ev.decode(item.data, [
          item.topic0,
          item.topic1,
          item.topic2,
          item.topic3,
          item.topic4
        ].filter(i => i))
    })
  }
  public count (eventName: string, filter: Record<string, string>, range: Range, dbIndtance) {
    const ff = this.formatFilter(eventName, filter)
    const rangeFilter = this.formatRange(range)
    return dbIndtance.event.count({
      where: {
        AND: [rangeFilter, ff]
      }
    })
  }
}