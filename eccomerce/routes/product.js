const express = require('express');
const Product = require('../models/Product');
const router = express.Router();



//Get request for prodicts
router.get('/', async (req, res) =>{
    const products = await Product.find();
    res.json(products);
});

// Posts new products from the user

router.post('/', async (req, res) =>{
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct)
});

module.exports = router;



