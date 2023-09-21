import express from "express"; 
import cors from "cors"; 
import "dotenv/config"; 
import logger from "./utils/logger.js";
import { connect } from "./utils/database.connection.js";


//routes(middlewares)
const productRoutes = require('../routes/productRoutes');
const stripe = require('stripe')('sk_test_51Ns9obAuazamskfx2FbGPFJyekhZ7Le2CEX6fBvU18ZnocXHhBGhz3FQdy1kjQ9BTgPGvyiq8XsOxvHOhrG5w9eI00zvkNE8OF');
const cors = require('cors');
const productRouter = require("./routes/product.js");
const supplierRouter = require("./routes/supplier.js");
const stockRouter = require("./routes/stock.js");
const customerRoutes = require("./routes/customer.js");
const loyaltyRoute = require("./routes/loyalitydb.js");


require("dotenv").config();
app.use(cors()); 
const app = express(); 
const PORT = process.env.PORT || 3013; 
// only access 3000 in frontend req app.use(cors({origin: "http://localhost:3000"}));
app.use(express.json({ limit: "2mb" })); // use express json increase limit


app.use('/customer',customerRoutes);
app.use("/loyality", loyaltyRoute);
app.use("/product", productRouter);
app.use("/supplier", supplierRouter);
app.use("/stock", stockRouter);


app.listen(PORT, () => {

  logger.info("initiating mongodb...");
  connect();
  console.log(`Server running on port: ${PORT}`);
  app.use("/supplier", supplierRouter);
  app.use('/api/products', productRoutes);
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

}); // listen to port










