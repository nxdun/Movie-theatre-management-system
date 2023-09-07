import express from 'express';  // import express    
import cors from 'cors';       // import cors
import 'dotenv/config';       // import dotenv with config
import logger from "./utils/logger.js";

require('dotenv').config();
// console.log(process.env)

const app = express();                       // create express app
const PORT = process.env.PORT || 3002;      // create port
app.use(cors());                           // use cors def open to any endppoint
                                          // only access 3000 in frontend req app.use(cors({origin: "http://localhost:3000"}));
app.use(express.json({limit : "20mb"}))  // use express json

 app.get('/', (req, res, next) => {    // get request
res.send("Hello from express");       // send response
    }); 
    
    
 app.listen(PORT, () =>{ 
    logger.info("hi");
    console.log(`Server running on port: ${PORT}`)
}); // listen to port


