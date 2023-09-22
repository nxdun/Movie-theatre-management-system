const Prd = require('../src/models/Prd');
//@GET Product function
const getAllProducts = async (req, res) => {
    try {
        const Prd = await Prd.find({});

        res.json(Prd);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}
//@GET Product by id function
const getProductsById = async (req, res) => {
    try {
        const Prd = await Prd.findById(req.params.id);

        res.json(Prd);
          
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports = { getAllProducts, getProductsById };