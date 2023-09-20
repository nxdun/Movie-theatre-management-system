const express = require("express");
const Display = require("../model/displayModel");
const { createDisplay, getDisplays, getDisplay, deleteDisplay, updateDisplay } = require("../controllers/displayController");

const router = express.Router()

router.post("/api/displays",createDisplay);
router.get("/api/displays", getDisplays);
router.get("/api/displays/:id", getDisplay);
router.delete("/api/displays/:id", deleteDisplay);
router.put("/api/displays/:id", updateDisplay);

module.exports = router