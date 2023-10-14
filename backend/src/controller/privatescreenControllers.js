const Privatescreen = require("../models/privatescreen"); // Import the Privatescreen model
const { validationResult } = require("express-validator");

// Controller function to create a new private screen
const createPrivatescreen = async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    privscname,
    privseatcapacity,
    privscprice,
    privsclocation,
    privscdescription,
    privscimage,
  } = req.body;

  try {
    const createdPrivatescreen = await Privatescreen.create({
      privscname,
      privseatcapacity,
      privscprice,
      privsclocation,
      privscdescription,
      privscimage,
    });

    res.status(201).json({ privatescreen: createdPrivatescreen });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Creating private screen failed" });
  }
};

// Controller function to get all private screens
const getAllPrivatescreens = async (req, res, next) => {
  try {
    const privatescreens = await Privatescreen.find();
    res.json({ privatescreens });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Fetching private screens failed" });
  }
};

// Controller function to get a private screen by ID
const getPrivatescreenById = async (req, res, next) => {
  const privatescreenId = req.params.id; // Assuming you pass the ID as a parameter in the URL

  try {
    const privatescreen = await Privatescreen.findById(privatescreenId);

    if (!privatescreen) {
      return res.status(404).json({ message: "Private screen not found" });
    }

    res.json({ privatescreen });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Fetching private screen failed" });
  }
};

// Controller function to update a private screen by ID
const updatePrivatescreenById = async (req, res, next) => {
  const {
    privscname,
    privseatcapacity,
    privscprice,
    privsclocation,
    privscdescription,
    privscimage,
  } = req.body;
  const privatescreenId = req.params.id; // Assuming you pass the ID as a parameter in the URL

  try {
    const updatedPrivatescreen = await Privatescreen.findByIdAndUpdate(
      privatescreenId,
      {
        privscname,
        privseatcapacity,
        privscprice,
        privsclocation,
        privscdescription,
        privscimage,
      },
      { new: true } // To get the updated document
    );

    if (!updatedPrivatescreen) {
      return res.status(404).json({ message: "Private screen not found" });
    }

    res.json({ privatescreen: updatedPrivatescreen });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Updating private screen failed" });
  }
};

// Controller function to delete a private screen by ID
const deletePrivatescreenById = async (req, res, next) => {
  const privatescreenId = req.params.id; // Assuming you pass the ID as a parameter in the URL

  try {
    const deletedPrivatescreen = await Privatescreen.findByIdAndDelete(
      privatescreenId
    );

    if (!deletedPrivatescreen) {
      return res.status(404).json({ message: "Private screen not found" });
    }

    res.json({ message: "Private screen deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Deleting private screen failed" });
  }
};

module.exports = {
  createPrivatescreen,
  updatePrivatescreenById,
  getPrivatescreenById,
  deletePrivatescreenById,
  getAllPrivatescreens,
};
