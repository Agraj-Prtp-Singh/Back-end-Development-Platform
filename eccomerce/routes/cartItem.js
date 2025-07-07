const express = require('express');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');
const router = express.Router();


//Get cart
router.get('/', async (req, res)=>{
    const cart = await CartItem.find().populate('productId');
    res.json(cart);
});

//Add to cart


router.post('/add/:id', async (req, res)=>{
    const product = await Product.findById(req.params.id);
    if(!product) 
        return res.status(404).json({message: 'Product not found'})

    let item = await CartItem.findOne({ productId: req.params.id});
    if(item){
        item.quantity += 1;
    }else{
        item = new CartItem({ productId: req.params.id, quantity: 1 });
    }

    await item.save();
    res.json(item);
});

//Deleting from the cart

router.delete('/remove/:id', async (req, res) => {
  await CartItem.deleteOne({ productId: req.params.id });
  res.json({ message: 'Item removed' });
});




module.exports = router;