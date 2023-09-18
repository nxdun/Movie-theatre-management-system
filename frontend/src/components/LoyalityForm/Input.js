import "./Input.css";
import { useReducer, useEffect } from "react";
import { validate } from "./LoyalityValidators";

// Input reducer used for handling input change
const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };

    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

// Main input component
const Input = (props) => {
  // Use useReducer at the top level of the component
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
    isTouched: false,
  });

  // Trigger initial validation when the component mounts
  useEffect(() => {
    dispatch({
      type: "CHANGE",
      val: inputState.value,
      validators: props.validators,
    });
  }, [props.validators, inputState.value]);

  // Touch handler for handling input touch
  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  // Handling input change connection with useReducer
  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  // This is for adding different input types to form creator as wanted
  const element =
    props.element === "input" ? (
      <input
        className="placement"
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={inputState.value} // Two-way binding
        onBlur={touchHandler}
      />
    ) : (
      <textarea
        className="placement"
        rows={props.rows || 3}
        value={inputState.value}
        onBlur={touchHandler}
      />
    );

  return (
    <div
      className={`formctrl ${
        !inputState.isValid && inputState.isTouched && "invalidator"
      }`}
    >
      <label htmlFor={props.id}>
        {props.label} :{element}
      </label>
      <h1>{console.log(inputState.isValid)}</h1>
      {!inputState.isValid && inputState.isTouched && (
        <h1>{props.errorText}</h1>
      )}
    </div>
  );
  // If isValid is false, then show the error text
};

export default Input;
