import "./FormCreator.css";
import { useState, useEffect } from "react";
import axios from "axios";

//main function
const FormCreator = (props) => {
  const ReloadMe = () => {
    window.location.reload();
  }

  if(props.e.length === 0){
    props.close();
  }else if(props.e.length >=2){
    props.close();
  }
  const first = props.e[0];
  const initialValues = {
    UserName: first.UserName ? first.UserName : null,
    FirstName: first.FirstName,
    LastName: first.LastName,
    BirthDate: first.BirthDate.split('T')[0],
    PhoneNumber: first.PhoneNumber,
    Gender: first.Gender,
    Email: first.Email,
    optInForMarketing: first.optInForMarketing,
    TicketCount:first.TicketCount,
    Type:first.Type,
    LoyaltyPoints: first.LoyaltyPoints,
    LoyaltyRegisteredDate: first.LoyaltyRegisteredDate ? first.LoyaltyRegisteredDate.split('T')[0] : null,
    PointResetDate: first.PointResetDate ? first.PointResetDate.split('T')[0] : null,
  };
  console.log(props.e)
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  

  // Form validation
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;


  // Special handling for checkboxes(common error)
  if (type === "checkbox") {
    setFormValues({ ...formValues, [name]: checked });
  } else {
    setFormValues({ ...formValues, [name]: value });
  }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post("/customer/add/", formValues);
        console.log(response.data); // Assuming the response contains a success message
        setIsSubmit(true);
        setFormErrors({}); // Clear any previous errors
        ReloadMe();
      } catch (error) {
        console.error("Error submitting data:", error);
        console.log(error.response.data);
        console.log("Form values submitted:", formValues);
        // Handle the error and display an error message if needed
      }
    } else {
      setIsSubmit(false); // Validation failed, do not set isSubmit to true
    }
  };

  const validate = (values) => {
    const errors = {};
    const usernameRegex = /^[a-zA-Z0-9_]{5,15}$/;
    const nameRegex = /^[a-zA-Z\s]{3,30}$/;
    const phoneRegex = /^\+94\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const loyaltyPointsRegex = /^\d+(\.\d{1,2})?$/;

    if (!values.UserName) {
      errors.UserName = "Username is required!";
    } else if (!usernameRegex.test(values.UserName)) {
      errors.UserName =
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

    if (!loyaltyPointsRegex.test(values.LoyaltyPoints)) {
      errors.LoyaltyPoints =
        "Loyalty Points must be a valid number with up to two decimal places.";
    }

    if (!values.Email) {
      errors.Email = "Email is required!";
    } else if (!emailRegex.test(values.Email)) {
      errors.Email = "This is not a valid email format!";
    }

    if (!values.Gender) {
      errors.Gender = "gender is mandatory!";
    }

    if (!values.BirthDate) {
      errors.BirthDate = "BirthDate is mandatory!";
    }

    return errors;
  };

  return (
      <div className="modal-container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success" >Data submitted successfully</div>
        
      ) : null}

      <form onSubmit={handleSubmit} className="modal-form">
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="l-div">
            <div className="field">
              <label>FEUserName</label>
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
                value= {formValues.FirstName}
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
            <button className="sub-button" >Add</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormCreator;
