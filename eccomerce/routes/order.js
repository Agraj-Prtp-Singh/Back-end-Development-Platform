const express = require('express');
const CartItem = require('../models/CartItem');
const Order = require('../models/Order');
const router = express.Router();


router.get('/', async (req, res)=>{
    const orders = await Order.find().populate('items.productId');
    res.json(orders)
});


router.post('/checkouot', async(req, res)=>{
    const cartItems = await CartItem.find();
    if(cartItems.length === 0){
        return res.status(400).json({message: 'Cart is empty'});
    }

    const newOrder = new Order({
        items: cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity 
        }))
    });
    await newOrder.save();
    await cartItems.deleteMany();
    res.status(201).json({ message: 'Order placed', order: newOrder});
});

module.exports = router;


