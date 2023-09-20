const express = require("express");
const Screen = require("../model/screenModel");
const { createScreen, getScreens, getScreen, deleteScreen, updateScreen } = require("../controllers/screenController");

const router = express.Router()

router.post("/api/screens",createScreen);
router.get("/api/screens", getScreens);
router.get("/api/screens/:id", getScreen);
router.delete("/api/screens/:id", deleteScreen);
router.put("/api/screens/:id", updateScreen);

module.exports = router