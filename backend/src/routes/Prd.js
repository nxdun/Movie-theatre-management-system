const router = require("express").Router();
const Product = require("../models/Prd"); // Import the Product model

router.route("/add").post(async (req, res) => {
  try {
    const { name, imageUrl, description, price, countInStock } = req.body;

    const newProduct = new Product({
      name,
      imageUrl,
      description,
      price,
      countInStock,
    });

    await newProduct.save();
    res.json({ message: "Product added successfully" });
  } catch (err) {
    res.status(400).json({ error: "Error adding Product", details: err.message });
  }
});

router.route("/").get((req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => {
      console.error("Error: ", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});


router.route("/get/:id").get(async (req, res) => {
  try {
    const prdID = req.params.id;
    console.log(prdID);
    const result = await Product.findById(prdID);
    if (!result) {
      res.status(400).json(res, 404, "Prd not found");
    }
    res.status(200).json({ status: "Prd fetched", result });
  } catch (err) {
    res.status(400).json(res, 500, `Error with get customer: ${err.message}`);
  }
});

module.exports = router;
