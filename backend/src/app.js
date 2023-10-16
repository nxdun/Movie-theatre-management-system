import express from "express";
import "dotenv/config";
import logger from "./utils/logger.js";
import { connect } from "./utils/database.connection.js";

// Import your routes heree
import supplierRouter from "./routes/supplier.js";
import stockRouter from "./routes/stock.js";
import customerRoutes from "./routes/customer.js";
import loyaltyRoute from "./routes/loyalitydb.js";
import productRouter from "./routes/product.js";
import Prd from "./routes/Prd.js";
const advertisementRoutes = require("./routes/advertisementRoute");
const screenRoutes = require("./routes/screenRoute")

// Stripe setup
const stripe = require('stripe')('sk_test_51Ns9obAuazamskfx2FbGPFJyekhZ7Le2CEX6fBvU18ZnocXHhBGhz3FQdy1kjQ9BTgPGvyiq8XsOxvHOhrG5w9eI00zvkNE8OF');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3015;
const cors = require('cors');


// Middleware
app.use(express.json({ limit: "2mb" }));
app.use(cors());

// Routes
app.use("/customer",customerRoutes);
app.use("/loyality", loyaltyRoute);
app.use('/prd', Prd);
app.use("/product", productRouter);
app.use("/supplier", supplierRouter);
app.use("/stock", stockRouter);
app.use("/api/advertisements", advertisementRoutes);
app.use("/api/screens", screenRoutes);


// app.get("/adv", (req, res)=>{
//   res.send("Home page");
// });

// MongoDB connection
app.listen(PORT, async () => {
  logger.info("Initializing MongoDB...");
  await connect();
  console.log(`Server running on port: ${PORT}`);
});

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
      success_url: 'http://localhost:3000/success', // Redirect to success page on payment success
      cancel_url: 'http://localhost:3000/cancel', // Redirect to cancel page on payment cancel
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the checkout session.' });
  }
});

export default app;
