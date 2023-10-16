const express = require("express");
const Advertisement = require("../model/advertisementModel");
const { createAdvertisement, getAdvertisements, getAdvertisement, deleteAdvertisement, updateAdvertisement } = require("../controllers/advertisementController");

const router = express.Router()

router.post("/api/advertisements", createAdvertisement);
router.get("/api/advertisements", getAdvertisements);
router.get("/api/advertisements/:id", getAdvertisement);
router.delete("/api/advertisements/:id", deleteAdvertisement);
router.put("/api/advertisements/:id", updateAdvertisement);

module.exports = router