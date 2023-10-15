import "./FormCreator.css";
import { useState, useEffect } from "react";
import axios from "axios";
//main function
const LoyalityRuler = () => {
  const ReloadMe = () => {
    window.location.reload();
  };
  const initialValues = {
    startingPoints: "",
    maximumPoints: "",
    incrementValue: "",
    pointToCashConversionRate: "",
    resetMonthPeriod: "",
    enableAutomatedPointReset: false,
    enableManualConfig: false,
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/loyality/");
        const data = response.data;
        setFormValues({
          startingPoints: data.startingPoints,
          maximumPoints: data.maximumPoints,
          incrementValue: data.incrementValue,
          pointToCashConversionRate: data.pointToCashConversionRate,
          resetMonthPeriod: data.resetMonthPeriod,
          enableAutomatedPointReset: data.enableAutomatedPointReset,
          enableManualConfig: data.enableManualConfig,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect ruuns once when the component mounts

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormValues({ ...formValues, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        console.log(formValues);
        await axios.post("/loyality/", formValues);
        setIsSubmit(true);
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    } else {
      setIsSubmit(false);
    }
  };

  const validate = (values) => {
    const errors = {};
    const numericRegex = /^\d+(\.\d{1,2})?$/;

    if (!values.startingPoints) {
      errors.startingPoints = "Starting Points is required!";
    } else if (!numericRegex.test(values.startingPoints)) {
      errors.startingPoints =
        "Starting Points must be a valid number with up to two decimal places.";
    }

    if (!values.maximumPoints) {
      errors.maximumPoints = "Maximum Points allowed is required!";
    } else if (!numericRegex.test(values.maximumPoints)) {
      errors.maximumPoints =
        "Maximum Points allowed must be a valid number with up to two decimal places.";
    }

    if (!values.incrementValue) {
      errors.incrementValue = "Increment Value per purchase is required!";
    } else if (!numericRegex.test(values.incrementValue)) {
      errors.incrementValue =
        "Increment Value per purchase must be a valid number with up to two decimal places.";
    }

    if (!values.pointToCashConversionRate) {
      errors.pointToCashConversionRate =
        "Point to Cash Conversion Rate is required!";
    } else if (!numericRegex.test(values.pointToCashConversionRate)) {
      errors.pointToCashConversionRate =
        "Point to Cash Conversion Rate must be a valid number with up to two decimal places.";
    }

    if (values.enableAutomatedPointReset) {
      if (!values.resetMonthPeriod) {
        errors.resetMonthPeriod =
          "Reset Month Period is required when Enable Automated Point Reset is enabled!";
      }
    }

    return errors;
  };

  return (
    <div className="modal-container">
     

      <form onSubmit={handleSubmit} className="modal-form">
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="l-div">
            <div className="field">
              <div className="field">
                <label>Enable Manual Configuration</label>
                <input
                  type="checkbox"
                  name="enableManualConfig"
                  onChange={handleChange}
                  checked={formValues.enableManualConfig}
                />
              </div>
              <label>Starting Points</label>
              <input
                type="string"
                name="startingPoints"
                placeholder="Starting Points"
                onChange={handleChange}
                value={formValues.startingPoints}
              />
            </div>
            <p className="error">{formErrors.startingPoints}</p>

            <div className="field">
              <label>Maximum Points allowed</label>
              <input
                type="string"
                name="maximumPoints"
                placeholder="Maximum Points"
                onChange={handleChange}
                value={formValues.maximumPoints}
              />
            </div>
            <p className="error">{formErrors.maximumPoints}</p>

            <div className="field">
              <label>Increment Value per purchase</label>
              <input
                type="string"
                name="incrementValue"
                placeholder="Increment Value"
                onChange={handleChange}
                value={formValues.incrementValue}
              />
            </div>
            <p className="error">{formErrors.incrementValue}</p>

            <div className="field">
              <label>Point to Cash Conversion Rate</label>
              <input
                type="string"
                step="0.01"
                name="pointToCashConversionRate"
                placeholder="Point to Cash Conversion Rate"
                onChange={handleChange}
                value={formValues.pointToCashConversionRate}
              />
            </div>
            <p className="error">{formErrors.pointToCashConversionRate}</p>
          </div>
          <div className="r-div">
            <div className="field">
              <label>Enable Automated Point Reset</label>
              <input
                type="checkbox"
                name="enableAutomatedPointReset"
                onChange={handleChange}
                checked={formValues.enableAutomatedPointReset}
              />
            </div>
            <div className="field">
              <label>Reset Month Period</label>
              <input
                type="number"
                name="resetMonthPeriod"
                placeholder="in months"
                onChange={handleChange}
                value={formValues.resetMonthPeriod}
              />
            </div>
            <p className="error">{formErrors.resetMonthPeriod}</p>
            {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Data submitted successfully</div>
      ) : null}

            <button className="sub-button">Add</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoyalityRuler;
