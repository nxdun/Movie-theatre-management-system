const router = require("express").Router();
const Customer = require("../models/customer.js");
const logem = require("../utils/logger.js");

// Error handling middleware
const errorHandler = (res, status, message) => {
  res.status(status).json({ status: message });
};

// Create a customer
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
    TicketCount = 0,
  } = req.body;

  try {
    const existingCustomer = await Customer.findOne({ $or: [{ UserName }, { PhoneNumber }] });
    if (existingCustomer) {
      return errorHandler(res, 400, "A customer with the same UserName or PhoneNumber already exists.");
    }

    const newCustomer = new Customer({
      UserName,
      FirstName,
      LastName,
      BirthDate,
      PhoneNumber,
      Gender,
      Email,
      optInForMarketing,
      TicketCount,
      LoyaltyRegisteredDate: loyalty ? new Date() : null,
      Type: loyalty,
      LoyaltyPoints: loyalty ? 0 : undefined,
    });

    await newCustomer.save();
    res.json(loyalty ? "Loyalty Customer added!" : "Non-Loyalty Customer added!");
  } catch (err) {
    errorHandler(res, 400, `Error creating ${loyalty ? 'loyalty' : 'non-loyalty'} customer: ${err}`);
  }
};

// Create a normal customer with or without ticket count (admin)
router.route("/a/add").post(async (req, res) => {
  await createCustomer(req, res);
});

// Create a normal customer without ticket count (normal)
router.route("/add").post(async (req, res) => {
  await createCustomer(req, res);
});

// Create a loyalty customer
router.route("/loyaltyadd").post(async (req, res) => {
  await createCustomer(req, res, true);
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

    const result = await Customer.findByIdAndUpdate(cid, updatedCustomer, { new: true });
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
