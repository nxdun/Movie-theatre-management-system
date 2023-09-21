const router = require('express').Router();
let Stock = require('../models/stock.js');

router.route('/add').post((req, res) => {
    const P_id = req.body.P_id;
    const s_id = req.body.s_id;
    const P_quantity = req.body.P_quantity;
    const St_price = req.body.St_price;

    const newStock = new Stock({
        P_id,
        s_id,
        P_quantity,
        St_price
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
router.route('/get/:id').put(async(req, res) => {
    let stockId = req.params.id;
    const stock= await Stock.findById(stockId).then((stock) => {
        res.status(200).send({status: "Stock fetched", stock})
    }).catch((err) => {     
        console.log(err.message);
        res.status(500).send({status: "Error with get stock", error: err.message});
    })  
})  
module.exports = router;
