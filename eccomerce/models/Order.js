const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items:[
        {
            productId:{
                type: mongoose.Schema.Types.ObjectId, //store the _id of a document from another collection here
                ref: 'Product' 
            },
            quantity: Number
        }
    ],
    date: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model('Order', orderSchema);
