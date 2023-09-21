import React, { useState } from "react";

import "../styles/addPrivRoom.css";

const AddPrivRoom = () => {
  const emptydata = {
    screeningRoomName: "",
    seatCapacity: "",
    userImage: "",
    screeningRoomLocation: "",
    price: "",
    message: "",
  };

  const [formData, SetFormData] = useState(emptydata);
  const [imagePreview, setImagePreview] = useState("");

  const InputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      // Handle file input separately to show the image preview
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreview("");
      }
    } else {
      SetFormData((preData) => ({
        ...preData,
        [name]: value,
      }));
    }
  };

  const formSubmitEvent = (e) => {
    e.preventDefault();

    // Reset form on submit
    e.target.reset();
    SetFormData(emptydata);
    setImagePreview("");

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
                  Add Private Screening Room
                </h4>

                <div className="row">


                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="d-block">Screening Room Name</label>
                      <input
                        type="text"
                        name="screeningRoomName"
                        className="form-control"
                        value={formData.screeningRoomName}
                        onChange={InputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="d-block">Seat Capacity</label>
                      <input
                        type="text"
                        name="seatCapacity"
                        className="form-control"
                        value={formData.seatCapacity}
                        onChange={InputChange}
                      />
                    </div>
                  </div>
                 {/* <div className="col-lg-12">
                    <div className="form-group text-center">
                    <label className="d-block">Image</label>
                      <div className="userprofile-img-bx">
                        <img
                          id="imgpreviewPrf"
                          src={
                            imagePreview || formData.userImage ||
                            "https://image.flaticon.com/icons/svg/145/145867.svg"
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
                  </div>*/}
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="d-block">Screening Room Location</label>
                      <input
                        type="text"
                        name="screeningRoomLocation"
                        className="form-control"
                        value={formData.screeningRoomLocation}
                        onChange={InputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="d-block">Price (Rs.)</label>
                      <input
                        type="text"
                        name="price"
                        className="form-control"
                        value={formData.price}
                        onChange={InputChange}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label className="d-block">Description</label>
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
                      Add Room
                    </button>
                    <button className="btn btn-primary form-cancel">
                      Cancel
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

export default AddPrivRoom;
