import { Order } from '../Model/order';
import { OrderItem } from '../Model/order-item';

export const GetOrder = async (req: any, res: any) => {
  try {
    const Orders: any = await Order.find({}).populate('user');
    res.send(Orders);
  } catch (err: any) {
    console.log(err);
    res.json({
      status: 'Failed!',
      message: err.message,
    });
  }
};

export const GetOrderByID = async (req: any, res: any) => {
  try {
    const Orders: any = await Order.findById(req.params.id)
      .populate('user', 'name')
      .populate({
        path: 'orderItems',
        populate: {
          path: 'product',
          populate: 'category',
        },
      });
    res.send(Orders);
  } catch (err: any) {
    console.log(err);
    res.json({
      status: 'Failed!',
      message: err.message,
    });
  }
};

export const CreateOrder = async (req: any, res: any) => {
  try {
    const ItemsVar: any = await Promise.all(
      req.body.orderItems.map(async (Item: any) => {
        const orderItems: any = await OrderItem.create({
          quantity: Item.quantity,
          product: Item.product,
        });
        return orderItems._id;
      })
    );

    const totalPrices = await Promise.all(
      ItemsVar.map(async (orderItemId: any) => {
        const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice;
      })
    );

    const totalPrice = totalPrices.reduce((a: any, b: any) => a + b, 0);

    const Orders: any = await Order.create({
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
    });
    if (!Orders) {
      return res.status(400).json({
        status: 'Cannot Create',
      });
    }
    res.send(Orders);
    res.status(200).json({
      status: 'Successful',
    });
  } catch (err: any) {
    console.log(err);
    res.json({
      status: 'Failed!',
      message: err.message,
    });
  }
};

export const UpdateOrder = async (req: any, res: any) => {
  try {
    const orders: any = await Order.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      { new: true }
    );
    res.send(orders);
  } catch (err: any) {
    console.log(err);
    res.json({
      status: 'Failed!',
      message: err.message,
    });
  }
};

export const DeleteOrder = async (req: any, res: any) => {
  Order.findByIdAndRemove(req.params.id)
    .then(async (order: any) => {
      if (order) {
        await order.orderItems.map(async (orderItem: any) => {
          await OrderItem.findByIdAndRemove(orderItem);
        });
        return res.status(200).json({ success: true, message: 'the order is deleted!' });
      } else {
        return res.status(404).json({ success: false, message: 'order not found!' });
      }
    })
    .catch((err: any) => {
      return res.status(500).json({ success: false, error: err });
    });
};

export const GetTotalSales = async (req: any, res: any) => {
  const totalSales = await Order.aggregate([{ $group: { _id: null, totalsales: { $sum: '$totalPrice' } } }]);

  if (!totalSales) {
    return res.status(400).send('The order sales cannot be generated');
  }

  res.send({ totalsales: totalSales.pop().totalsales });
};

export const GetOrderCounts = async (req: any, res: any) => {
  const orderCount = await Order.countDocuments((count: any) => count);

  if (!orderCount) {
    res.status(500).json({ success: false });
  }
  res.send({
    orderCount: orderCount,
  });
};

export const GetUsersOrder = async (req: any, res: any) => {
    const userOrderList = await Order.find({user: req.params.userid}).populate({ 
        path: 'orderItems', populate: {
            path : 'product', populate: 'category'} 
        }).sort({'dateOrdered': -1});

    if(!userOrderList) {
        res.status(500).json({success: false})
    } 
    res.send(userOrderList);
}

