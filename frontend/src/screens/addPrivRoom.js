import React from "react";
import { useNavigate } from "react-router-dom";

import Input from "../components/PrivateScreenForm/Input";
import Button from "../components/PrivateScreenForm/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../components/util/validators";
import { useForm } from "../components/PrivateScreenHooks/privScform-hook";
import "./inputPrivRoom.css";

const AddPrivRoom = () => {
  const [formState, inputHandler] = useForm(
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
    },
    false
  );

  const navigate = useNavigate();

  const handleCancelButtooncliclk = () => {
    navigate("/privatescreen/dashboard");
  };

  const privScreenSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); // send this to the backend!
  };

  return (
    <form className="privscreen-form" onSubmit={privScreenSubmitHandler}>
      <h4 className="form-heading mb-4 text-primary text-center">
        Add Private Screening Room
      </h4>
      <Input
        id="privscname"
        element="input"
        type="text"
        label="Screening Room Name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid screening name."
        onInput={inputHandler}
      />
      <Input
        id="privscprice"
        element="input"
        type="text"
        label="Screening Room Price"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid screening price."
        onInput={inputHandler}
      />
      <Input
        id="privseatcapacity"
        element="input"
        type="text"
        label="Screening Room Seat Capacity"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid screening seat capacity."
        onInput={inputHandler}
      />
      <Input
        id="privsclocation"
        element="input"
        type="text"
        label="Screening Room Location"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid screening location."
        onInput={inputHandler}
      />
      <Input
        id="privscdescription"
        element="textarea"
        label="Screening Room Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid screening room description.(at least 5 characters.)"
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD ROOM
      </Button>
      <Button onClick={handleCancelButtooncliclk}>Cancel</Button>
    </form>
  );
};

export default AddPrivRoom;
