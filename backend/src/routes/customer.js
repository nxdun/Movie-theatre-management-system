const router = require("express").Router();
const Customer = require("../models/customer.js");
const logem = require("../utils/logger.js");

// Creates a normal customer + with or without ticket count(admin)
router.route("/a/add").post((req, res) => {
  const {
    UserName,
    FirstName,
    LastName,
    BirthDate,
    PhoneNumber,
    Gender,
    Email,
    optInForMarketing,
    TicketCount,
  } = req.body;

  // Check if a customer with the same UserName or PhoneNumber already exists
  Customer.findOne({ $or: [{ UserName }, { PhoneNumber }] })
    .then((existingCustomer) => {
      if (existingCustomer) {
        // If a customer with the same UserName or PhoneNumber exists, throw an error
        res
          .status(400)
          .json(
            "A customer with the same UserName or PhoneNumber already exists."
          );
      } else {
        // If no customer with a matching UserName or PhoneNumber is found, create a new customer
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
          LoyaltyRegisteredDate: null,
          Type: false,
        });

        newCustomer
          .save()
          .then(() => res.json("Non-Loyalty Customer added!"))
          .catch((err) =>
            res.status(400).json("Error creating customer: " + err)
          );
      }
    })
    .catch((err) =>
      res.status(400).json("Error checking for existing customer: " + err)
    );
});

// Creates a normal customer + without ticket count(normal)
// succed with ticket count but not added to database
// for normal registeration with added security
// throws error if same username or number exists
router.route("/add").post((req, res) => {
  const {
    UserName,
    FirstName,
    LastName,
    BirthDate,
    PhoneNumber,
    Gender,
    Email,
    optInForMarketing,
  } = req.body;

  // Check if a customer with the same UserName or PhoneNumber already exists
  Customer.findOne({ $or: [{ UserName }, { PhoneNumber }] })
    .then((existingCustomer) => {
      if (existingCustomer) {
        // If a customer with the same UserName or PhoneNumber exists, throw an error
        res
          .status(400)
          .json(
            "A customer with the same UserName or PhoneNumber already exists."
          );
      } else {
        // If no customer with a matching UserName or PhoneNumber is found, create a new customer
        const newCustomer = new Customer({
          UserName,
          FirstName,
          LastName,
          BirthDate,
          PhoneNumber,
          Gender,
          Email,
          optInForMarketing,
          TicketCount: 0,
          LoyaltyRegisteredDate: null,
          Type: false,
        });

        newCustomer
          .save()
          .then(() => res.json("Non-Loyalty Customer added!"))
          .catch((err) =>
            res.status(400).json("Error creating customer: " + err)
          );
      }
    })
    .catch((err) =>
      res.status(400).json("Error checking for existing customer: " + err)
    );
});

// Route to create a loyalty customer
router.route("/loyalityadd").post((req, res) => {
  const {
    UserName,
    FirstName,
    LastName,
    BirthDate,
    PhoneNumber,
    Gender,
    Email,
    optInForMarketing,
    TicketCount,
  } = req.body;

  // Check if a customer with the same UserName or PhoneNumber already exists
  Customer.findOne({ $or: [{ UserName }, { PhoneNumber }] })
    .then((existingCustomer) => {
      if (existingCustomer) {
        // If a customer with the same UserName or PhoneNumber exists, throw an error
        res
          .status(400)
          .json(
            "A customer with the same UserName or PhoneNumber already exists."
          );
      } else {
        // If no customer with a matching UserName or PhoneNumber is found, create a new loyalty customer
        const newLoyaltyCustomer = new Customer({
          UserName,
          FirstName,
          LastName,
          BirthDate,
          PhoneNumber,
          Gender,
          Email,
          optInForMarketing,
          TicketCount: 0,
          LoyaltyRegisteredDate: new Date(),
          Type: true,
          LoyaltyPoints: 0,
        });

        newLoyaltyCustomer
          .save()
          .then(() => res.json("Loyalty Customer added!"))
          .catch((err) =>
            res.status(400).json("Error creating loyalty customer: " + err)
          );
      }
    })
    .catch((err) =>
      res.status(400).json("Error checking for existing customer: " + err)
    );
});

// Get all customers
router.route("/").get((req, res) => {
  Customer.find()
    .then((customers) => res.json(customers))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get a specific customer by ID
router.route("/get/:id").get(async (req, res) => {
  try {
    const customerId = req.params.id;

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ status: "Customer not found" });
    }
    res.status(200).json({ status: "Customer fetched", customer });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ status: "Error with get customer", error: err.message });
  }

  // Update customer by ID
  router.put("/update/:id", async (req, res) => {
    try {
      const cid = req.params.id;
      const {
        UserName,
        FirstName,
        LastName,
        BirthDate,
        PhoneNumber,
        Gender,
        Email,
        optInForMarketing,
        TicketCount,
      } = req.body;

      const updatedCustomer = {
        UserName,
        FirstName,
        LastName,
        BirthDate,
        PhoneNumber,
        Gender,
        Email,
        optInForMarketing,
        TicketCount,
      };

      const result = await Customer.findByIdAndUpdate(cid, updatedCustomer, {
        new: true,
      });

      if (!result) {
        return res.status(404).json({ status: "Customer is not found" });
      }

      res.json({ status: "customer is updated", customer: result });
    } catch (error) {
      res.status(500).json({ status: "Error", error: error.message });
    }
  });

  // Delete customer by ID
  router.route("/delete/:id").delete(async (req, res) => {
    try {
      const customerId = req.params.id;

      const customer = await Customer.findByIdAndDelete(customerId);

      if (!customer) {
        return res.status(404).json({ status: "Customer not found" });
      }

      res.status(200).json({ status: "Customer deleted" });
    } catch (err) {
      console.error(err.message);
      res
        .status(500)
        .json({ status: "Error with deleting customer", error: err.message });
    }
  });
});

module.exports = router;
