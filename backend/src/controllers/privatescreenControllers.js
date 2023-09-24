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

// Controller function to get a private screen by ID
const getPrivatescreenById = async (req, res, next) => {
  const privScId = req.params.privScId;

  try {
    const privatescreen = await Privatescreen.findById(privScId);

    if (!privatescreen) {
      return res.status(404).json({ message: "Private screen not found" });
    }

    res.json({ privatescreen });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Error while fetching private screen",
        error: error.message,
      });
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

// Controller function to update a private screen by ID
const updatePrivatescreenById = async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const privScId = req.params.privScId;
  const updatedData = req.body; // Data to update

  try {
    const updatedPrivatescreen = await Privatescreen.findByIdAndUpdate(
      privScId,
      updatedData,
      { new: true }
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
  const privScId = req.params.privScId;

  try {
    const deletedPrivatescreen = await Privatescreen.findByIdAndRemove(
      privScId
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
  getPrivatescreenById,
  updatePrivatescreenById,
  deletePrivatescreenById,
  getAllPrivatescreens,
};
