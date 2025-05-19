const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Mock data for products
let products = [
    { id: 1, name: 'T-shirt', price: 19.99, description: 'Basic cotton t-shirt' },
    { id: 2, name: 'Jeans', price: 39.99, description: 'Blue denim jeans' },
    { id: 3, name: 'Sweater', price: 49.99, description: 'Warm knitted sweater' },
];

// In-memory cart
let cart = [];

// Route to get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Route to add a product to the cart
app.post('/api/cart', (req, res) => {
    const productId = req.body.productId;
    const product = products.find(p => p.id === productId);

    if (product) {
        cart.push(product);
        res.status(200).send('Product added to cart');
    } else {
        res.status(404).send('Product not found');
    }
});

// Route to get cart items
app.get('/api/cart', (req, res) => {
    res.json(cart);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
