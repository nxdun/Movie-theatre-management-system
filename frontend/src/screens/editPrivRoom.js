import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./inputPrivRoom.css";

const EditPrivRoom = () => {
  const privScId = useParams().privScId;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const handleCancelButtonClick = () => {
    navigate("/privatescreen/dashboard");
  };

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

  useEffect(() => {
    const fetchPrivateScreenData = async () => {
      try {
        const response = await axios.get(`/privatescreen/${privScId}`);
        const privateScreenData = response.data.privatescreen;

        const initialFormValues = {
          privscname: {
            value: privateScreenData.privscname,
            isValid: true,
          },
          privscprice: {
            value: privateScreenData.privscprice,
            isValid: true,
          },
          privseatcapacity: {
            value: privateScreenData.privseatcapacity,
            isValid: true,
          },
          privsclocation: {
            value: privateScreenData.privsclocation,
            isValid: true,
          },
          privscdescription: {
            value: privateScreenData.privscdescription,
            isValid: true,
          },
          privscimage: {
            value: privateScreenData.privscimage,
            isValid: true,
          },
        };

        setFormState(initialFormValues);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchPrivateScreenData();
  }, [privScId]);

  const validateField = (fieldName, value) => {
    let isValid = true;
    switch (fieldName) {
      case "privscname":
        isValid = value.trim() !== "";
        break;
      case "privscprice":
        isValid = value.trim() !== "";
        break;
      case "privseatcapacity":
        isValid = value.trim() !== "";
        break;
      case "privsclocation":
        isValid = value.trim() !== "";
        break;
      case "privscdescription":
        isValid = value.trim().length >= 5;
        break;
      case "privscimage":
        isValid = value.trim() !== "";
        break;
      default:
        break;
    }
    return isValid;
  };

  const inputHandler = (fieldName, value) => {
    const updatedFormState = { ...formState };
    updatedFormState[fieldName].value = value;
    updatedFormState[fieldName].isValid = validateField(fieldName, value);
    setFormState(updatedFormState);
  };

  const privScreenUpdateSubmitHandler = async (event) => {
    event.preventDefault();

    const fieldValidationErrors = {};
    for (const fieldName in formState) {
      if (!formState[fieldName].isValid) {
        fieldValidationErrors[fieldName] = true;
      }
    }

    if (Object.keys(fieldValidationErrors).length > 0) {
      setFieldErrors(fieldValidationErrors);
      return;
    }

    try {
      const response = await axios.put(`/editprivatescreen/${privScId}`, {
        privscname: formState.privscname.value,
        privscprice: formState.privscprice.value,
        privseatcapacity: formState.privseatcapacity.value,
        privsclocation: formState.privsclocation.value,
        privscdescription: formState.privscdescription.value,
        privscimage: formState.privscimage.value,
      });

      if (response.status === 200) {
        window.alert("Room updated successfully!");
        navigate(`/privatescreen/dashboard`);
      } else {
        window.alert("Failed to update room. Please try again.");
      }
    } catch (err) {
      console.error(err);
      window.alert("An error occurred while updating the room.");
    }
  };

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="privscreen-form" onSubmit={privScreenUpdateSubmitHandler}>
      <h4 className="form-heading mb-4 text-primary text-center">
        Edit Private Screening Room
      </h4>
      <div className={`form-control ${fieldErrors.privscname && "form-control--invalid"}`}>
        <label htmlFor="privscname">Screening Room Name</label>
        <input
          id="privscname"
          type="text"
          onChange={(e) => inputHandler("privscname", e.target.value)}
          value={formState.privscname.value}
        />
        {fieldErrors.privscname && <p className="error-text">Please enter a valid screening name.</p>}
      </div>
      <div className={`form-control ${fieldErrors.privscprice && "form-control--invalid"}`}>
        <label htmlFor="privscprice">Price</label>
        <input
          id="privscprice"
          type="text"
          onChange={(e) => inputHandler("privscprice", e.target.value)}
          value={formState.privscprice.value}
        />
        {fieldErrors.privscprice && <p className="error-text">Please enter a valid price.</p>}
      </div>
      <div className={`form-control ${fieldErrors.privseatcapacity && "form-control--invalid"}`}>
        <label htmlFor="privseatcapacity">Seat Capacity</label>
        <input
          id="privseatcapacity"
          type="text"
          onChange={(e) => inputHandler("privseatcapacity", e.target.value)}
          value={formState.privseatcapacity.value}
        />
        {fieldErrors.privseatcapacity && <p className="error-text">Please enter a valid seat capacity.</p>}
      </div>
      <div className={`form-control ${fieldErrors.privsclocation && "form-control--invalid"}`}>
        <label htmlFor="privsclocation">Location</label>
        <input
          id="privsclocation"
          type="text"
          onChange={(e) => inputHandler("privsclocation", e.target.value)}
          value={formState.privsclocation.value}
        />
        {fieldErrors.privsclocation && <p className="error-text">Please enter a valid location.</p>}
      </div>
      <div className={`form-control ${fieldErrors.privscdescription && "form-control--invalid"}`}>
        <label htmlFor="privscdescription">Description</label>
        <textarea
          id="privscdescription"
          rows="5"
          onChange={(e) => inputHandler("privscdescription", e.target.value)}
          value={formState.privscdescription.value}
        />
        {fieldErrors.privscdescription && <p className="error-text">Please enter a valid description.</p>}
      </div>
      <div className={`form-control ${fieldErrors.privscimage && "form-control--invalid"}`}>
        <label htmlFor="privscimage">Image</label>
        <input
          id="privscimage"
          type="text"
          onChange={(e) => inputHandler("privscimage", e.target.value)}
          value={formState.privscimage.value}
        />
        {fieldErrors.privscimage && <p className="error-text">Please enter a valid image.</p>}
      </div>

      <button type="submit" className="inputform-button1">EDIT ROOM</button>
      <button onClick={handleCancelButtonClick} className="inputform-button2">Cancel</button>
    </form>
  );
};

export default EditPrivRoom;
