import "./FormCreator.css";
import Input from "./Input";
import { VALIDATOR_REQUIRE } from "./LoyalityValidators";
const FormCreator = () => {
  return (
    <form className="place-form">
      <Input element="input" type="text" label="Name" errorText = "invalid" validators = {[VALIDATOR_REQUIRE()]}/>
    </form>
  );
}; 

export default FormCreator;
