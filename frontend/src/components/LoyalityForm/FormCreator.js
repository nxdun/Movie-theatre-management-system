import "./FormCreator.css";
import { useState, useEffect } from "react";

const FormCreator = () => {
  const initialValues = {
    username: "",
    FirstName: "",
    LastName: "",
    BirthDate: "",
    PhoneNumber: "",
    Gender: "",
    Email: "",
    optInForMarketing: false,
    TicketCount: 0,
    Type: false,
    LoyaltyPoints: 0,
    LoyaltyRegisteredDate: "",
    PointResetDate: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const usernameRegex = /^[a-zA-Z0-9_]{5,15}$/;
    const nameRegex = /^[a-zA-Z\s]{5,30}$/;
    const phoneRegex = /^\+94\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const loyaltyPointsRegex = /^\d+(\.\d{1,2})?$/;

    if (!values.username) {
      errors.username = "Username is required!";
    } else if (!usernameRegex.test(values.username)) {
      errors.username =
        "Username must be 5-15 characters and can only include letters, numbers, and underscores.";
    }

    if (!values.FirstName) {
      errors.FirstName = "First Name is required!";
    } else if (!nameRegex.test(values.FirstName)) {
      errors.FirstName =
        "First Name must be 5-30 characters and can only include letters and spaces.";
    }

    if (!values.LastName) {
      errors.LastName = "Last Name is required!";
    } else if (!nameRegex.test(values.LastName)) {
      errors.LastName =
        "Last Name must be 5-30 characters and can only include letters and spaces.";
    }

    if (!values.PhoneNumber) {
      errors.PhoneNumber = "Phone Number is required!";
    } else if (!phoneRegex.test(values.PhoneNumber)) {
      errors.PhoneNumber =
        "Phone Number must start with +94 and have 9 additional numbers.";
    }

    if (values.Type !== true && values.Type !== false) {
      errors.Type = "Type must be true or false.";
    }

    if (!loyaltyPointsRegex.test(values.LoyaltyPoints)) {
      errors.LoyaltyPoints =
        "Loyalty Points must be a valid number with up to two decimal places.";
    }

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    return errors;
  };

  return (
    <div className="modal-container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Signed in successfully</div>
      ) : (
        ""
      )}

      <form onSubmit={handleSubmit} className="modal-form">
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="l-div">
            <div className="field">
              <label>UserName</label>
              <input
                type="text"
                name="UserName"
                placeholder="UserName"
                value={formValues.UserName}
                onChange={handleChange}
              />
            </div>
            <p className="error">{formErrors.UserName}</p>
            <div className="field">
              <label>First Name</label>
              <input
                type="text"
                name="FirstName"
                placeholder="First Name"
                value={formValues.FirstName}
                onChange={handleChange}
              />
            </div>
            <p className="error">{formErrors.FirstName}</p>
            <div className="field">
              <label>Last Name</label>
              <input
                type="text"
                name="LastName"
                placeholder="Last Name"
                value={formValues.LastName}
                onChange={handleChange}
              />
            </div>
            <p className="error">{formErrors.LastName}</p>
            <div className="field">
              <label>Birth Date</label>
              <input
                type="date"
                name="BirthDate"
                value={formValues.BirthDate}
                onChange={handleChange}
              />
            </div>
            <p className="error">{formErrors.BirthDate}</p>
            <div className="field">
              <label>Phone Number</label>
              <input
                type="text"
                name="PhoneNumber"
                placeholder="Phone Number"
                value={formValues.PhoneNumber}
                onChange={handleChange}
              />
            </div>
            <p className="error">{formErrors.PhoneNumber}</p>
            <div className="field">
              <label>Gender</label>
              <select
                name="Gender"
                value={formValues.Gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div className="r-div">
            <p className="error">{formErrors.Gender}</p>
            <div className="field">
              <label>Email</label>
              <input
                type="text"
                name="Email"
                placeholder="Email"
                value={formValues.Email}
                onChange={handleChange}
              />
            </div>
            <p className="error">{formErrors.Email}</p>

            <div className="field">
              <label>Ticket Count</label>
              <input
                type="text"
                name="TicketCount"
                value={formValues.TicketCount}
                readOnly
              />
            </div>

            <div className="field">
              <label>Type</label>
              <select
                name="Type"
                value={formValues.Type}
                onChange={handleChange}
              >
                <option value={true}>Loyalty Customer</option>
                <option value={false}>Non Loyalty Customer</option>
              </select>
            </div>
            <p className="error">{formErrors.Type}</p>

            <div className="field">
              <label>Loyalty Points</label>
              <input
                type="text"
                name="LoyaltyPoints"
                placeholder="Loyalty Points"
                value={formValues.LoyaltyPoints}
                onChange={handleChange}
              />
            </div>
            <p className="error">{formErrors.LoyaltyPoints}</p>

            <div className="field">
              <label>Loyalty Registered Date</label>
              <input
                type="text"
                name="LoyaltyRegisteredDate"
                value={formValues.LoyaltyRegisteredDate}
                readOnly
              />
            </div>

            <div className="field">
              <label>Point Reset Date</label>
              <input
                type="text"
                name="PointResetDate"
                value={formValues.PointResetDate}
                readOnly
              />
            </div>
            <div className="field">
              <label>Opt-in for Marketing</label>
              <input
                type="checkbox"
                name="optInForMarketing"
                checked={formValues.optInForMarketing}
                onChange={handleChange}
              />
            </div>
            <button className="sub-button">Add</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormCreator;
