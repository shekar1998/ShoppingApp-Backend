"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        while (_) try {
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
exports.GetUsersOrder = exports.GetOrderCounts = exports.GetTotalSales = exports.DeleteOrder = exports.UpdateOrder = exports.CreateOrder = exports.GetOrderByID = exports.GetOrder = void 0;
var order_1 = require("../Model/order");
var order_item_1 = require("../Model/order-item");
var GetOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Orders, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, order_1.Order.find({}).populate('user')];
            case 1:
                Orders = _a.sent();
                res.send(Orders);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log(err_1);
                res.json({
                    status: 'Failed!',
                    message: err_1.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.GetOrder = GetOrder;
var GetOrderByID = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Orders, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, order_1.Order.findById(req.params.id)
                        .populate('user', 'name')
                        .populate({
                        path: 'orderItems',
                        populate: {
                            path: 'product',
                            populate: 'category',
                        },
                    })];
            case 1:
                Orders = _a.sent();
                res.send(Orders);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                console.log(err_2);
                res.json({
                    status: 'Failed!',
                    message: err_2.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.GetOrderByID = GetOrderByID;
var CreateOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ItemsVar, totalPrices, totalPrice, Orders, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, Promise.all(req.body.orderItems.map(function (Item) { return __awaiter(void 0, void 0, void 0, function () {
                        var orderItems;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, order_item_1.OrderItem.create({
                                        quantity: Item.quantity,
                                        product: Item.product,
                                    })];
                                case 1:
                                    orderItems = _a.sent();
                                    return [2 /*return*/, orderItems._id];
                            }
                        });
                    }); }))];
            case 1:
                ItemsVar = _a.sent();
                return [4 /*yield*/, Promise.all(ItemsVar.map(function (orderItemId) { return __awaiter(void 0, void 0, void 0, function () {
                        var orderItem, totalPrice;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, order_item_1.OrderItem.findById(orderItemId).populate('product', 'price')];
                                case 1:
                                    orderItem = _a.sent();
                                    totalPrice = orderItem.product.price * orderItem.quantity;
                                    return [2 /*return*/, totalPrice];
                            }
                        });
                    }); }))];
            case 2:
                totalPrices = _a.sent();
                totalPrice = totalPrices.reduce(function (a, b) { return a + b; }, 0);
                return [4 /*yield*/, order_1.Order.create({
                        orderItems: ItemsVar,
                        shippingAddress1: req.body.shippingAddress1,
                        shippingAddress2: req.body.shippingAddress2,
                        city: req.body.city,
                        zip: req.body.zip,
                        country: req.body.country,
                        phone: req.body.phone,
                        status: req.body.status,
                        totalPrice: totalPrice,
                        user: req.body.user,
                    })];
            case 3:
                Orders = _a.sent();
                if (!Orders) {
                    return [2 /*return*/, res.status(400).json({
                            status: 'Cannot Create',
                        })];
                }
                res.send(Orders);
                res.status(200).json({
                    status: 'Successful',
                });
                return [3 /*break*/, 5];
            case 4:
                err_3 = _a.sent();
                console.log(err_3);
                res.json({
                    status: 'Failed!',
                    message: err_3.message,
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.CreateOrder = CreateOrder;
var UpdateOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, order_1.Order.findByIdAndUpdate(req.params.id, __assign({}, req.body), { new: true })];
            case 1:
                orders = _a.sent();
                res.send(orders);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                console.log(err_4);
                res.json({
                    status: 'Failed!',
                    message: err_4.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.UpdateOrder = UpdateOrder;
var DeleteOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        order_1.Order.findByIdAndRemove(req.params.id)
            .then(function (order) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!order) return [3 /*break*/, 2];
                        return [4 /*yield*/, order.orderItems.map(function (orderItem) { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, order_item_1.OrderItem.findByIdAndRemove(orderItem)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json({ success: true, message: 'the order is deleted!' })];
                    case 2: return [2 /*return*/, res.status(404).json({ success: false, message: 'order not found!' })];
                }
            });
        }); })
            .catch(function (err) {
            return res.status(500).json({ success: false, error: err });
        });
        return [2 /*return*/];
    });
}); };
exports.DeleteOrder = DeleteOrder;
var GetTotalSales = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var totalSales;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, order_1.Order.aggregate([{ $group: { _id: null, totalsales: { $sum: '$totalPrice' } } }])];
            case 1:
                totalSales = _a.sent();
                if (!totalSales) {
                    return [2 /*return*/, res.status(400).send('The order sales cannot be generated')];
                }
                res.send({ totalsales: totalSales.pop().totalsales });
                return [2 /*return*/];
        }
    });
}); };
exports.GetTotalSales = GetTotalSales;
var GetOrderCounts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderCount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, order_1.Order.countDocuments(function (count) { return count; })];
            case 1:
                orderCount = _a.sent();
                if (!orderCount) {
                    res.status(500).json({ success: false });
                }
                res.send({
                    orderCount: orderCount,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.GetOrderCounts = GetOrderCounts;
var GetUsersOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userOrderList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, order_1.Order.find({ user: req.params.userid }).populate({
                    path: 'orderItems', populate: {
                        path: 'product', populate: 'category'
                    }
                }).sort({ 'dateOrdered': -1 })];
            case 1:
                userOrderList = _a.sent();
                if (!userOrderList) {
                    res.status(500).json({ success: false });
                }
                res.send(userOrderList);
                return [2 /*return*/];
        }
    });
}); };
exports.GetUsersOrder = GetUsersOrder;
