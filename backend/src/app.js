import express from "express"; 
import cors from "cors"; 

import "dotenv/config"; 
import logger from "./utils/logger.js";
import { connect } from "./utils/database.connection.js";

//routes(middlewares)
const productRouter = require("./routes/product.js");
const supplierRouter = require("./routes/supplier.js");
const stockRouter = require("./routes/stock.js");
const customerRoutes = require("./routes/customer.js");
const loyaltyRoute = require("./routes/loyalitydb.js");


require("dotenv").config();
// console.log(process.env))
const app = express(); 
const PORT = process.env.PORT || 3013; 
app.use(cors()); 
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

}); // listen to port