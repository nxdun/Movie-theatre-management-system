import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./inputPrivRoom.css";
import swal from "sweetalert2";


const AddPrivRoom = () => {
  const navigate = useNavigate();
  const [fieldErrors, setFieldErrors] = useState({});

  const [formState, setFormState] = useState({
    privscname: {
      value: "",
      isValid: false,
    },
    privscprice: {
      value: "",
      isValid: false,
    },
    privseatcapacity: {
      value: "",
      isValid: false,
    },
    privsclocation: {
      value: "",
      isValid: false,
    },
    privscdescription: {
      value: "",
      isValid: false,
    },
    privscimage: {
      value: "",
      isValid: false,
    },
  });

  const handleCancelButtonClick = () => {
    navigate("/privatescreen/dashboard");
  };

  const validateForm = () => {
    const fieldValidationErrors = {};
    let isFormValid = true;

    // Validate each field individually
    for (const fieldName in formState) {
      const fieldValue = formState[fieldName].value;
      let isValid = true;

      switch (fieldName) {
        case "privscname":
          isValid = fieldValue.trim() !== "";
          break;
        case "privscprice":
          isValid = fieldValue >= 1;
          break;
        case "privseatcapacity":
          isValid = fieldValue >= 1;
          break;
        case "privsclocation":
          isValid = fieldValue.trim() !== "";
          break;
        case "privscdescription":
          isValid = fieldValue.trim().length >= 5;
          break;
        case "privscimage":
          isValid = fieldValue.trim() !== "";
          break;
        default:
          break;
      }

      if (!isValid) {
        fieldValidationErrors[fieldName] = true;
        isFormValid = false;
      }
    }

    setFieldErrors(fieldValidationErrors);

    if (!isFormValid) {
      // Display an error popup using swal
      swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all fields before submitting.",
      });
    }

    return isFormValid;
  };

  const inputHandler = (fieldName, value) => {
    const updatedFormState = { ...formState };
    updatedFormState[fieldName].value = value;
    setFormState(updatedFormState);
  };

  const privScreenSubmitHandler = async (event) => {
    event.preventDefault();

    const isFormValid = validateForm();

    if (!isFormValid) {
      return;
    }

    try {
      const response = await axios.post("/privatescreen", {
        privscname: formState.privscname.value,
        privscprice: formState.privscprice.value,
        privseatcapacity: formState.privseatcapacity.value,
        privsclocation: formState.privsclocation.value,
        privscdescription: formState.privscdescription.value,
        privscimage: formState.privscimage.value,
      });

      if (response.status === 201) {
        swal.fire({
          icon: "success",
          title: "Success",
          text: "Private Screen added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/privatescreen/dashboard");
      } else { 
        window.alert("Failed to add room. Please try again.");
      }
    } catch (err) {
      console.log(err);
      window.alert("An error occurred while adding the room.");
    }
  };

  return (
    <form className="privscreen-form" onSubmit={privScreenSubmitHandler}>
      <h4 className="ggs">
        ADD PRIVATE ROOM
      </h4>
      <div
        className={`form-control ${
          fieldErrors.privscname && "form-control--invalid"
        }`}
      >
        <label htmlFor="privscname">Private Screen Name:</label>
        <input
          id="privscname"
          type="text"
          onChange={(e) => {
            inputHandler("privscname", e.target.value);
            setFieldErrors({ ...fieldErrors, privscname: false });
          }}
          value={formState.privscname.value}
        />
        {fieldErrors.privscname && (
          <p className="error-text">Please enter a valid screening name.</p>
        )}
      </div>
      <div
        className={`form-control ${
          fieldErrors.privscprice && "form-control--invalid"
        }`}
      >
        <label htmlFor="privscprice">Price (Rs):</label>
        <input
          id="privscprice"
          type="text"
          min="1"
          onChange={(e) => {
            inputHandler("privscprice", e.target.value);
            setFieldErrors({ ...fieldErrors, privscprice: false });
          }}
          value={formState.privscprice.value}
        />
        {fieldErrors.privscprice && (
          <p className="error-text">Please enter a valid price.</p>
        )}
      </div>
      <div
        className={`form-control ${
          fieldErrors.privseatcapacity && "form-control--invalid"
        }`}
      >
        <label htmlFor="privseatcapacity">Seat Capacity:</label>
        <input
          id="privseatcapacity"
          type="number"
          min= "1"
          onChange={(e) => {
            inputHandler("privseatcapacity", e.target.value);
            setFieldErrors({ ...fieldErrors, privseatcapacity: false });
          }}
          value={formState.privseatcapacity.value}
        />
        {fieldErrors.privseatcapacity && (
          <p className="error-text">Please enter a valid seat capacity.</p>
        )}
      </div>
      <div
        className={`form-control ${
          fieldErrors.privsclocation && "form-control--invalid"
        }`}
      >
        <label htmlFor="privsclocation">Location:</label>
        <input
          id="privsclocation"
          type="text"
          onChange={(e) => {
            inputHandler("privsclocation", e.target.value);
            setFieldErrors({ ...fieldErrors, privsclocation: false });
          }}
          value={formState.privsclocation.value}
        />
        {fieldErrors.privsclocation && (
          <p className="error-text">Please enter a valid location.</p>
        )}
      </div>
      <div
        className={`form-control ${
          fieldErrors.privscdescription && "form-control--invalid"
        }`}
      >
        <label htmlFor="privscdescription">Description:</label>
        <textarea
          id="privscdescription"
          rows="5"
          onChange={(e) => {
            inputHandler("privscdescription", e.target.value);
            setFieldErrors({ ...fieldErrors, privscdescription: false });
          }}
          value={formState.privscdescription.value}
        />
        {fieldErrors.privscdescription && (
          <p className="error-text">
            Please enter a valid description (at least 5 characters).
          </p>
        )}
      </div>
      <div
        className={`form-control ${
          fieldErrors.privscimage && "form-control--invalid"
        }`}
      >
        <label htmlFor="privscimage">Image URL:</label>
        <input
          id="privscimage"
          type="text"
          onChange={(e) => {
            inputHandler("privscimage", e.target.value);
            setFieldErrors({ ...fieldErrors, privscimage: false });
          }}
          value={formState.privscimage.value}
        />
        {fieldErrors.privscimage && (
          <p className="error-text">Please enter a valid image.</p>
        )}
      </div>

      <button className="inputform-button1" type="submit">ADD ROOM</button>
      <button className="inputform-button2" onClick={handleCancelButtonClick}>Cancel</button>
    </form>
  );
};

export default AddPrivRoom;
