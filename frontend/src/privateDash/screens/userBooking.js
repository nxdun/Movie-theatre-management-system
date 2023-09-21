import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactSelect from "react-select";
import "../styles/userBooking.css";

const UserBooking = () => {
  const options = [
    { value: "gujarat", label: "Gujarat" },
    { value: "delhi", label: "Delhi" },
    { value: "punjab", label: "Punjab" },
    { value: "maharashtra", label: "Maharashtra" },
    { value: "rajasthan", label: "Rajasthan" },
  ];

  const multioptions = [
    { value: "orange", label: "Orange" },
    { value: "mango", label: "Mango" },
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "grapes", label: "Grapes" },
  ];
  const emptydata = {
    userImage: "",
    userImageName: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    subject: "",
    reactselect: "",
    reactmultiselect: [],
    gender: "",
    hobbies: [],
    message: "",
  };
  const [formData, SetFormData] = useState({
    userImage: "",
    userImageName: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    subject: "",
    reactselect: "",
    reactmultiselect: [],
    gender: "",
    hobbies: [],
    message: "",
  });

  const InputChange = (e) => {
    const { name, value } = e.target;
    if (name === "hobbies") {
      const hobbies = formData.hobbies;
      const index = hobbies.indexOf(value);
      if (e.target.checked === true) {
        hobbies.push(value);
      } else if (e.target.checked === false) {
        hobbies.splice(index, 1);
      }
    } else if (name === "userImage") {
      let reader = new FileReader();
      let file = e.target.files[0];
      let filename = e.target.files[0].name;
      reader.onloadend = () => {
        SetFormData((preValue) => {
          return {
            ...preValue,
            userImageName: filename,
            userImage: reader.result,
          };
        });
      };
      if (e.target.files[0]) {
        reader.readAsDataURL(file);
      }
    } else {
      SetFormData((preData) => {
        return {
          ...preData,
          [name]: value,
        };
      });
    }
  };

  const formSubmitEvent = (e) => {
    e.preventDefault();

    // Reset form on submit
    e.target.reset();
    SetFormData(emptydata);

    // Result
    console.log(formData);
  };

  return (
    <React.Fragment>
      <div className="row m-0 justify-content-center">
        <div className="col-md-6 mt-5 mb-5">
          <div className="form-area">
            <div className="form-inner">
              <form onSubmit={formSubmitEvent}>
                <h4 className="form-heading mb-4 text-primary text-center">
                  React Multiple Inputs form
                </h4>

                <div className="row">
                  <div className="col-lg-12">
                    <div class="alert alert-warning" role="alert">
                      You can see result in console
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group text-center">
                      <div className="userprofile-img-bx">
                        <img
                          id="imgpreviewPrf"
                          src={
                            formData.userImage === ""
                              ? "https://image.flaticon.com/icons/svg/145/145867.svg"
                              : formData.userImage
                          }
                          alt="profile-img"
                          className="prf-img-prev"
                        />
                        <div className="profile-img-change-btn">
                          <i className="fa fa-pencil-alt"></i>
                          <input
                            type="file"
                            name="userImage"
                            className="filepreviewprofile"
                            onChange={InputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="d-block">First Name</label>
                      <input
                        type="text"
                        name="firstname"
                        className="form-control"
                        value={formData.firstname}
                        onChange={InputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="d-block">Last Name</label>
                      <input
                        type="text"
                        name="lastname"
                        className="form-control"
                        value={formData.lastname}
                        onChange={InputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="d-block">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={InputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="d-block">Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={InputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="d-block">Subject</label>
                      <select
                        name="subject"
                        className="form-control"
                        value={formData.subject}
                        onChange={InputChange}
                      >
                        <option value="">Select Subject</option>
                        <option value="subject 1">Subject 1</option>
                        <option value="subject 2">Subject 2</option>
                        <option value="subject 3">Subject 3</option>
                        <option value="subject 4">Subject 4</option>
                        <option value="subject 5">Subject 5</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group react-form-group">
                      <label className="d-block">State (React Select)</label>
                      <ReactSelect
                        options={options}
                        value={formData.reactselect}
                        placeholder="Select State"
                        onChange={(value) =>
                          SetFormData((prevalue) => {
                            return { ...prevalue, reactselect: value };
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group react-form-group">
                      <label className="d-block">
                        Select Fruit (Multiple) (React Select)
                      </label>
                      <ReactSelect
                        isMulti={true}
                        options={multioptions}
                        // closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        placeholder="Select Fruits"
                        value={formData.reactmultiselect}
                        onChange={(value) =>
                          SetFormData((prevalue) => {
                            return { ...prevalue, reactmultiselect: value };
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group radio-group">
                      <label className="d-block">Select Gender</label>
                      <div className="custom-control custom-radio d-inline-block mr-2">
                        <input
                          type="radio"
                          id="multiradio1"
                          name="gender"
                          className="custom-control-input"
                          value="Male"
                          onChange={InputChange}
                          checked={formData.gender === "Male"}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="multiradio1"
                        >
                          Male
                        </label>
                      </div>
                      <div className="custom-control custom-radio d-inline-block mr-2">
                        <input
                          type="radio"
                          id="multiradio2"
                          name="gender"
                          className="custom-control-input"
                          value="Female"
                          onChange={InputChange}
                          checked={formData.gender === "Female"}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="multiradio2"
                        >
                          Female
                        </label>
                      </div>
                      <div className="custom-control custom-radio d-inline-block mr-2">
                        <input
                          type="radio"
                          id="multiradio3"
                          name="gender"
                          className="custom-control-input"
                          value="Other"
                          onChange={InputChange}
                          checked={formData.gender === "Other"}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="multiradio3"
                        >
                          Other
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group radio-group">
                      <label className="d-block">Hobbies</label>
                      <div className="custom-control custom-checkbox d-inline-block mr-2">
                        <input
                          type="checkbox"
                          className="custom-control-input checkbox-input"
                          name="hobbies"
                          id="multicheckbox1"
                          value="Dance"
                          onChange={InputChange}
                          defaultChecked={
                            formData.hobbies.includes("Dance") ? true : false
                          }
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="multicheckbox1"
                        >
                          Dance
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox d-inline-block mr-2">
                        <input
                          type="checkbox"
                          className="custom-control-input checkbox-input"
                          name="hobbies"
                          id="multicheckbox2"
                          value="Music"
                          onChange={InputChange}
                          defaultChecked={
                            formData.hobbies.includes("Music") ? true : false
                          }
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="multicheckbox2"
                        >
                          Music
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox d-inline-block mr-2">
                        <input
                          type="checkbox"
                          className="custom-control-input checkbox-input"
                          name="hobbies"
                          id="multicheckbox3"
                          value="Cricket"
                          onChange={InputChange}
                          defaultChecked={
                            formData.hobbies.includes("Cricket") ? true : false
                          }
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="multicheckbox3"
                        >
                          Cricket
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label className="d-block">Message</label>
                      <textarea
                        name="message"
                        rows="4"
                        className="form-control"
                        value={formData.message}
                        onChange={InputChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-lg-12 text-right">
                    <button
                      type="submit"
                      className="btn btn-primary form-submit"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

//ReactDOM.render(<UserBooking />, document.getElementById("root"));

export default UserBooking;
