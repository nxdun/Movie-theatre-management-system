import './CustomerRegisterForm.css'
import { useState } from "react";

const CustomerRegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    phoneNumber: "",
    gender: "male", // Default to "male"
    email: "",
    marketingOptIn: false, // Default to unchecked
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here
    console.log(formData);
  };

  return (
    <div className="form-container">
      <h1 className='head-label'>New Customer Registration</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username" className="form-label">
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="form-input"
        />

        <label htmlFor="firstName" className="form-label">
          First Name:
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="form-input"
        />

        <label htmlFor="lastName" className="form-label">
          Last Name:
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="form-input"
        />

        <label htmlFor="birthDate" className="form-label">
          Birth Date:
        </label>
        <input
          type="date"
          id="birthDate"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          required
          className="form-input"
        />

        <label htmlFor="phoneNumber" className="form-label">
          Phone Number:
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          className="form-input"
        />

        <label htmlFor="gender" className="form-label ">
          Gender:
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="form-input gender"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="email" className="form-label">
          E-mail:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="form-input"
        />

        <label htmlFor="marketingOptIn" className="form-label">
          Opt-in for Marketing:
        </label>
        <input
          type="checkbox"
          id="marketingOptIn"
          name="marketingOptIn"
          checked={formData.marketingOptIn}
          onChange={handleChange}
          className="form-input"
        />

        <button type="submit" className="form-submit-button">
          Register
        </button>
      </form>
    </div>
  )
};


export default CustomerRegisterForm;
