require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const stripe = require('stripe')('sk_test_51NlliISAPYrR3kauLt4SWQ0yJUfNBjL7eOuG2IYfoL3eZVVTXs8dZ6vxFrv5pP3IruTVR0Z8oKoN1wdf3P0pjIYx009xsURUqk');

const cors = require('cors');

connectDB();

const app = express();

app.use(express.json());

app.use('/api/products', productRoutes);

app.use(cors());

// Checkout API
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { products } = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).json({ error: 'Products must be an array.' });
    }

    const lineItems = products.map((product) => ({
      price_data: {
        currency: 'lkr',
        product_data: {
          name: product.name,
        },
        unit_amount: product.price * 100,
      },
      quantity: product.qty,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',//if payment success redirect to success page
      cancel_url: 'http://localhost:3000/cancel',//if payment cancel redirect to cancel page
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the checkout session.' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));