const express = require("express");
const Advertisement = require("../models/advertisementModel");
const { createAdvertisement, getAdvertisements, getAdvertisement, deleteAdvertisement, updateAdvertisement } = require("../controller/advertisementController");

const router = express.Router()

router.route("/").get(getAdvertisements).post(createAdvertisement);
router.route("/:id").get(getAdvertisement).delete(deleteAdvertisement).put(updateAdvertisement);

/*router.post("/", createAdvertisement);
router.get("/", getAdvertisements);
router.get("/:id", getAdvertisement);
router.delete("/:id", deleteAdvertisement);
router.put("/:id", updateAdvertisement);
*/
module.exports = router