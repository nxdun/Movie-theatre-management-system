import "./Input.css";
import { useReducer } from "react";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  });

  //handling input change connection with useReducer
  const changeHandler = (event) => {
    dispatch({ type: "CHANGE", val: event.target.value });
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
    <div className={`formctrl ${!inputState.isValid && 'invalidator'}`}>
      <label htmlFor={props.id}>
        {props.label} :{element}
      </label>
      {!inputState.isValid && <p>{props.errorText}</p>}
    </div>
  );
  //if isValid is false then show the error text
};

export default Input;
