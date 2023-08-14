"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var thor_devkit_1 = require("thor-devkit");
var BaseEvent = /** @class */ (function () {
    function BaseEvent(address, events) {
        this.address = address;
        this.events = events;
    }
    BaseEvent.prototype.formatRange = function (range) {
        var _a;
        return range ? {
            clause: {
                tx: {
                    block: (_a = {},
                        _a[range.unit === 'block' ? 'number' : 'timestamp'] = {
                            gte: range.from,
                            lte: range.to
                        },
                        _a)
                }
            }
        } : undefined;
    };
    BaseEvent.prototype.formatFilter = function (name, filter) {
        var eventAbi = this.events.find(function (e) { return e.name === name; });
        var event = new thor_devkit_1.abi.Event(eventAbi);
        var result = {
            contractAddr: {
                equals: this.address
            }
        };
        var encoded = event.encode(filter || {});
        encoded.forEach(function (item, index) {
            if (item) {
                result["topic".concat(index)] = {};
                result["topic".concat(index)]['equals'] = item;
            }
        });
        return result;
    };
    BaseEvent.prototype.query = function (eventName, filter, range, skip, take, order, dbIndtance) {
        if (skip === void 0) { skip = 0; }
        if (take === void 0) { take = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var ff, rangeFilter, temp, eventAbi, ev;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ff = this.formatFilter(eventName, filter);
                        rangeFilter = this.formatRange(range);
                        return [4 /*yield*/, dbIndtance.event.findMany({
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
                                    createdAt: order
                                },
                                skip: skip,
                                take: take
                            })];
                    case 1:
                        temp = _a.sent();
                        eventAbi = this.events.find(function (e) { return e.name === eventName; });
                        ev = new thor_devkit_1.abi.Event(eventAbi);
                        return [2 /*return*/, temp.map(function (item) {
                                return ev.decode(item.data, [
                                    item.topic0,
                                    item.topic1,
                                    item.topic2,
                                    item.topic3,
                                    item.topic4
                                ].filter(function (i) { return i; }));
                            })];
                }
            });
        });
    };
    BaseEvent.prototype.count = function (eventName, filter, range, dbIndtance) {
        var ff = this.formatFilter(eventName, filter);
        var rangeFilter = this.formatRange(range);
        return dbIndtance.event.count({
            where: {
                AND: [rangeFilter, ff]
            }
        });
    };
    return BaseEvent;
}());
exports.default = BaseEvent;
