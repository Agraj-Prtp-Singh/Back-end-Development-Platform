const express = require('express');
const connectDB = require('./db');
const app = express();
const PORT = 3000;

connectDB();



app.use(express.json());



const productsRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const ordersRoutes = require('./routes/orders');

app.use('/products', productsRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', ordersRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

