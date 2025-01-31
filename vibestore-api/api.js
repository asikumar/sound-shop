const express = require('express');
const cors = require('cors');
const db = require('./db');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Define constants for HTTP status codes
const HTTP_BAD_REQUEST = 400;
const HTTP_INTERNAL_SERVER_ERROR = 500;

// Define a function to handle promise all logic
function handlePromiseAll(promises) {
  return Promise.all(promises)
    .then(results => results)
    .catch(err => {
      console.error(err);
      throw err;
    });
}


// API: Get all products
app.get('/api/allProducts', async (req, res) => {
    try {
      const [results] = await db.query('SELECT * FROM products');
      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: 'Error fetching products' });
    }
  });
  
  // API: Get product by ID
  app.get('/api/getProductById/:id', async (req, res) => {
    const productId = req.params.id;
    try {
      const [results] = await db.query('SELECT * FROM products WHERE id = ?', [productId]);
      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(HTTP_BAD_REQUEST).json({ message: 'Product not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: 'Error fetching product' });
    }
  });
  
  // API: Get cart items
  app.get('/api/getCartItems', async (req, res) => {
    try {
      const [results] = await db.query('SELECT * FROM cart');
      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: 'Error fetching cart items' });
    }
  });
  
  // API: Add to cart
  app.post('/api/addToCart', async (req, res) => {
    const { product_id, quantity } = req.body;
    try {
      await db.query('INSERT INTO cart (product_id, quantity) VALUES (?, ?)', [product_id, quantity]);
      res.status(201).json({ message: 'Product added to cart', product_id, quantity });
    } catch (err) {
      console.error(err);
      res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: 'Error adding product to cart' });
    }
  });
  
  // API: 'Buy Now' (to buy items and place an order)
  app.post('/api/buyNow/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
      const [cartItems] = await db.query('SELECT * FROM cart WHERE user_id = ?', [userId]);
  
      if (!cartItems || cartItems.length === 0) {
        return res.status(HTTP_BAD_REQUEST).json({ message: 'Cart is empty, please add items to the cart before buying.' });
      }
  
      let totalCost = 0;
      const orderDetails = [];
      cartItems.forEach(item => {
        totalCost += item.quantity * item.cost;
        orderDetails.push({ product_id: item.product_id, quantity: item.quantity, cost: item.cost });
      });
  
      await db.query('INSERT INTO orders (user_id, total_cost) VALUES (?, ?)', [userId, totalCost]);
  
      const [orderId] = await db.query('SELECT LAST_INSERT_ID()');
  
      const orderDetailsPromises = orderDetails.map(detail => {
        return db.query('INSERT INTO order_details (order_id, product_id, quantity, cost) VALUES (?, ?, ?, ?)', [orderId, detail.product_id, detail.quantity, detail.cost]);
      });
  
      await handlePromiseAll(orderDetailsPromises);
  
      await db.query('DELETE FROM cart WHERE user_id = ?', [userId]);
  
      res.json({ message: 'Order placed successfully, and cart has been cleared.' });
    } catch (err) {
      console.error(err);
      res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: 'Error placing order' });
    }
  });
  
  // API: Get all orders for a specific user
  app.get('/api/getMyOrders/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
      const [orders] = await db.query('SELECT * FROM orders WHERE user_id = ?', [userId]);
  
      if (!orders || orders.length === 0) {
        return res.status(HTTP_BAD_REQUEST).json({ message: 'No orders found for this user.' });
      }
  
      const orderPromises = orders.map(order => {
        return db.query('SELECT * FROM order_details WHERE order_id = ?', [order.id]);
      });
  
      const results = await handlePromiseAll(orderPromises);
  
      orders.forEach((order, index) => {
        order.orderDetails = results[index];
      });
  
      res.json(orders);
    } catch (err) {
      console.error(err);
      res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: 'Error fetching orders' });
    }
  });

// API: Create a new user
app.post('/api/users', async (req, res) => {
    const { username, email } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO users (username, email) VALUES (?, ?)',
        [username, email]
      );
      res.status(201).json({ id: result.insertId, username, email });
    } catch (err) {
      console.error(err);
      res.status(HTTP_INTERNAL_SERVER_ERROR).send('Server error');
    }
});

// API: Get all users
app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(HTTP_INTERNAL_SERVER_ERROR).send('Server error');
  }
});


// Set server port
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
