const express = require("express");
const Screen = require("../models/screenModel");
const { createScreen, getScreens, getScreen, deleteScreen, updateScreen } = require("../controller/screenController");

const router = express.Router()

router.route("/").get(getScreens).post(createScreen);
router.route("/:id").get(getScreen).delete(deleteScreen).put(updateScreen);


// router.post("/api/screens",createScreen);
// router.get("/api/screens", getScreens);
// router.get("/api/screens/:id", getScreen);
// router.delete("/api/screens/:id", deleteScreen);
// router.put("/api/screens/:id", updateScreen);

module.exports = router