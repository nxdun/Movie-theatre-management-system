import "./FormCreator.css";
import Input from "./Input";
const FormCreator = () => {
  return (
    <form className="place-form">
      <Input element="input" type="text" label="Name" />
    </form>
  );
};

export default FormCreator;
