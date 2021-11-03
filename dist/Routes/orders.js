"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var order_1 = require("../Controller/order");
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.get("/getOrders", order_1.GetOrder);
router.get("/getOrdersByID/:id", order_1.GetOrderByID);
router.get("/getTotalSales", order_1.GetTotalSales);
router.get("/getOrderCounts", order_1.GetOrderCounts);
router.get("/userorders/:userid", order_1.GetUsersOrder);
router.post("/creatOrders", order_1.CreateOrder);
router.put('/updateOrder/:id', order_1.UpdateOrder);
router.delete('/deleteOrder/:id', order_1.DeleteOrder);
module.exports = router;
