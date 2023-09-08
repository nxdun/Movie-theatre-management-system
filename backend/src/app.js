const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const logger = require("./utils/logger.js");
const { connect } = require("./utils/database.connection.js");

// Routes (middlewares)
const customerRoutes = require("./routes/routes-customer.js");
const supplierRouter = require("./routes/supplier.js");
const productRouter = require("./routes/product.js");
const stockRouter = require("./routes/user.js");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
// Use CORS with specific origin
// app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json({ limit: "2mb" }));

app.use("/get", customerRoutes);

app.listen(PORT, () => {
  logger.info("Connection established...");
  connect();
  console.log(`Server running on port: ${PORT}`);
});

app.use("/supplier", supplierRouter);
app.use("/product", productRouter);
app.use("/stock", stockRouter);
