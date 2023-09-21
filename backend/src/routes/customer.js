import logger from "../utils/logger.js";

const router = require("express").Router();
const Customer = require("../models/customer.js");
const logem = require("../utils/logger.js");

// Error handling middleware
const errorHandler = (res, status, message) => {
  res.status(status).json({ status: message });
};

// Modify the createCustomer function to handle both creation and editing
const createCustomer = async (req, res, loyalty = false) => {
  const {
    UserName,
    FirstName,
    LastName,
    BirthDate,
    PhoneNumber,
    Gender,
    Email,
    optInForMarketing,
    TicketCount = 0, // Set default TicketCount to 0
    Type = false, // Set default Type to false
    LoyaltyPoints = null, // Set default LoyaltyPoints to null
    LoyaltyRegisteredDate = null, // Set default LoyaltyRegisteredDate to null
    PointResetDate = null, // Set default PointResetDate to null
  } = req.body;

  try {
    // Check if the customer already exists by UserName or PhoneNumber
    const existingCustomer = await Customer.findOne({
      $or: [{ UserName }, { PhoneNumber }],
    });

    if (existingCustomer) {
      // If the customer exists, update the customer fields
      existingCustomer.UserName = UserName;
      existingCustomer.FirstName = FirstName;
      existingCustomer.LastName = LastName;
      existingCustomer.BirthDate = BirthDate;
      existingCustomer.PhoneNumber = PhoneNumber;
      existingCustomer.Gender = Gender;
      existingCustomer.Email = Email;
      existingCustomer.optInForMarketing = optInForMarketing;

      // If it's a loyalty customer, update loyalty-specific fields
      if (loyalty) {
        existingCustomer.Type = loyalty;
        existingCustomer.LoyaltyPoints = LoyaltyPoints;
        existingCustomer.LoyaltyRegisteredDate = new Date();
      }

      // Save the updated customer
      await existingCustomer.save();
      res.json(`Customer ${existingCustomer.UserName} updated.`);
    } else {
      // If the customer doesn't exist, create a new customer
      const newCustomer = new Customer({
        UserName,
        FirstName,
        LastName,
        BirthDate,
        PhoneNumber,
        Gender,
        Email,
        optInForMarketing,
        TicketCount, // Use the provided default TicketCount
        Type, // Use the provided default Type
        LoyaltyPoints, // Use the provided default LoyaltyPoints
        LoyaltyRegisteredDate, // Use the provided default LoyaltyRegisteredDate
        PointResetDate, // Use the provided default PointResetDate
      });

      await newCustomer.save();
      res.json(
        loyalty ? "Loyalty Customer added!" : "Non-Loyalty Customer added!"
      );
    }
  } catch (err) {
    logger.error("error in customer.js");
    errorHandler(
      res,
      400,
      `Error creating/editing ${
        loyalty ? "loyalty" : "non-loyalty"
      } customer: ${err}`
    );
  }
};

//....................
//.......routes.......
//....................

//add
router.route("/add").post(async (req, res) => {
  await createCustomer(req, res);  
});

// Get all customers
router.route("/").get(async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    errorHandler(res, 400, `Error: ${err}`);
  }
});

// Get a specific customer by ID
router.route("/get/:id").get(async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return errorHandler(res, 404, "Customer not found");
    }
    res.status(200).json({ status: "Customer fetched", customer });
  } catch (err) {
    errorHandler(res, 500, `Error with get customer: ${err.message}`);
  }
});

// Update customer by ID
router.route("/update/:id").put(async (req, res) => {
  try {
    const cid = req.params.id;
    const updatedCustomer = req.body;

    const result = await Customer.findByIdAndUpdate(cid, updatedCustomer, {
      new: true,
    });
    if (!result) {
      return errorHandler(res, 404, "Customer is not found");
    }

    res.json({ status: "Customer is updated", customer: result });
  } catch (error) {
    errorHandler(res, 500, `Error: ${error.message}`);
  }
});

// Delete customer by ID
router.route("/delete/:id").delete(async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findByIdAndDelete(customerId);

    if (!customer) {
      return errorHandler(res, 404, "Customer not found");
    }

    res.status(200).json({ status: "Customer deleted" });
  } catch (err) {
    errorHandler(res, 500, `Error with deleting customer: ${err.message}`);
  }
});

module.exports = router;
