import "./Input.css";
import { useReducer } from "react";
import { validate } from "./LoyalityValidators";

//input reducer used for handling input change
const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    default:
      return state;
  }
};

//main input component
const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  });

  //handling input change connection with useReducer
  const changeHandler = (event) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators,
    });
  };

  //this is for adding different input types to form creator as wanted
  const element =
    props.element === "input" ? (
      <input
        className="placement"
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={inputState.value} //two wayb binding
      />
    ) : (
      <textarea
        className="placement"
        rows={props.rows || 3}
        value={inputState.value}
      />
    );
    

  return (
    <div className={`formctrl ${!inputState.isValid && "invalidator"}`}>
      <label htmlFor={props.id}>
        {props.label} :{element}
      </label>
      <h1>{console.log(inputState.isValid)}</h1>
      {!inputState.isValid && <h1>{props.errorText}</h1>}
    </div>
  );
  //if isValid is false then show the error text
};

export default Input;
