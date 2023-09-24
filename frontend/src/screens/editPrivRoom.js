import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import Input from "../components/PrivateScreenForm/Input";
import Button from "../components/PrivateScreenForm/Button";
import Card from "../components/UIelements/Card";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../components/util/validators";
import "./inputPrivRoom.css";
import { useForm } from "../components/PrivateScreenHooks/privScform-hook";

const EditPrivRoom = () => {
  const privScId = useParams().privScId;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const handleCancelButtonClick = () => {
    navigate("/privatescreen/dashboard");
  };

  const [formState, inputHandler, setFormData] = useForm(
    {
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
    },
    false
  );

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

        setFormData(initialFormValues, true);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchPrivateScreenData();
  }, [privScId, setFormData]);

  const privScreenUpdateSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`/privatescreen/${privScId}`, {
        privscname: formState.inputs.privscname.value,
        privscprice: formState.inputs.privscprice.value,
        privseatcapacity: formState.inputs.privseatcapacity.value,
        privsclocation: formState.inputs.privsclocation.value,
        privscdescription: formState.inputs.privscdescription.value,
        privscimage: formState.inputs.privscimage.value,
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
      <Input
        id="privscname"
        element="input"
        type="text"
        label="Screening Room Name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid screening name."
        onInput={inputHandler}
        initialValue={formState.inputs.privscname.value} /* Add initialValue */
        initialIsValid={
          formState.inputs.privscname.isValid
        } /* Add initialIsValid */
      />
      <Input
        id="privscprice"
        element="input"
        type="text"
        label="Screening Room Price"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid screening price."
        onInput={inputHandler}
        initialValue={formState.inputs.privscprice.value} 
        initialIsValid={
          formState.inputs.privscprice.isValid
        }
      />
      <Input
        id="privseatcapacity"
        element="input"
        type="text"
        label="Screening Room Seat Capacity"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid screening seat capacity."
        onInput={inputHandler}
        initialValue={
          formState.inputs.privseatcapacity.value
        }
        initialIsValid={
          formState.inputs.privseatcapacity.isValid
        }
      />
      <Input
        id="privsclocation"
        element="input"
        type="text"
        label="Screening Room Location"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid screening location."
        onInput={inputHandler}
        initialValue={
          formState.inputs.privsclocation.value
        }
        initialIsValid={
          formState.inputs.privsclocation.isValid
        }
      />
      <Input
        id="privscdescription"
        element="textarea"
        label="Screening Room Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid screening room description.(at least 5 characters.)"
        onInput={inputHandler}
        initialValue={
          formState.inputs.privscdescription.value
        }
        initialIsValid={
          formState.inputs.privscdescription.isValid
        } 
      />
      <Input
        id="privscimage"
        element="input"
        type="text"
        label="Screening Room Image"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid screening image."
        onInput={inputHandler}
        initialValue={formState.inputs.privscimage.value}
        initialIsValid={
          formState.inputs.privscimage.isValid
        } 
      />

<Button type="submit" disabled={!formState.isValid}>
        EDIT ROOM
      </Button>
      <Button onClick={handleCancelButtonClick}>Cancel</Button>
    </form>
  );
};

export default EditPrivRoom;
