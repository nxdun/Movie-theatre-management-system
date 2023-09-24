const router = require("express").Router();
let Stock = require("../models/stock.js");

router.route('/add').post((req, res) => {
    const {
        St_productId,
        St_price,
        St_quantity
    } = req.body;

    const newStock = new Stock({
        St_productId,
        St_price,
        St_quantity
    })

    newStock.save()
        .then(() => res.json('Stock added!'))
        .catch(err => res.status(400).json('Error: ' + err));
})
router.route('/').get((req, res) => {
    Stock.find()
        .then(stock => res.json(stock))
        .catch(err => res.status(400).json('Error: ' + err));
})
router.route('/get/:productId').get(async (req, res) => {
    try {
        const productId = req.params.productId;
        const stocks = await Stock.find({ St_productId: productId });
        res.json({ status: 'Stocks retrieved', stocks });
    } catch (error) {
        res.status(400).json({ status: 'Error', error: error.message });
    }
    // let productId = req.params.productId;
    // const stock = await Stock.find({}, { projection: { St_productId: productId } }).then((stock) => {
    //     res.status(200).send({ status: "Stock fetched", stock })
    // }).catch((err) => {
    //     console.log(err.message);
    //     res.status(500).send({ status: "Error with get stock", error: err.message });
    // })
})
module.exports = router;
