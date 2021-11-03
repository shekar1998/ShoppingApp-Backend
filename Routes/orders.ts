import { GetOrder, CreateOrder, GetOrderByID, UpdateOrder, DeleteOrder, GetTotalSales, GetOrderCounts, GetUsersOrder } from '../Controller/order';
import express from 'express';
const router = express.Router();

router.get(`/getOrders`, GetOrder);
router.get(`/getOrdersByID/:id`, GetOrderByID);
router.get(`/getTotalSales`, GetTotalSales);
router.get(`/getOrderCounts`, GetOrderCounts);
router.get(`/userorders/:userid`, GetUsersOrder);


router.post(`/creatOrders`, CreateOrder);

router.put('/updateOrder/:id', UpdateOrder);

router.delete('/deleteOrder/:id', DeleteOrder);

module.exports = router;
