import React, { useCallback, useReducer } from "react";

import Input from "../components/PrivateScreenForm/Input";
import Button from "../components/PrivateScreenForm/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../components/util/validators";
import "./addPrivRoom.css";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputID in state.inputs) {
        if (inputID === action.inputID) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputID].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputID]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const AddPrivRoom = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
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
    isValid: false,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputID: id,
    });
  }, []);
  return (
    <form className="privscreen-form">
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
      <Button >Cancel</Button>
    </form>
  );
};

export default AddPrivRoom;
