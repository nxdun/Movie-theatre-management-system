require ('dotenv').config();
const productsData = require('./data/products');
const connectDB = require('./src/utils/database.connection');
const Product = require('./src/models/Prd');

connectDB();

const importData = async () => {
    try {
        await Product.deleteMany({});

        await Product.insertMany(productsData);

        console.log("Data Import Success");`1`

        process.exit();
    } catch (error) {
        console.error("Error with data import");
        process.exit(1);
    }
};
importData();