"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItem = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var orderItemSchema = new mongoose_1.default.Schema({
    quantity: {
        type: Number,
        required: true,
    },
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Product',
    },
}, { timestamps: true });
var OrderItem = mongoose_1.default.model('OrderItem', orderItemSchema);
exports.OrderItem = OrderItem;
