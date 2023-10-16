import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Card from "./UIelements/Card";
import "./PrivScreenItem.css";
import Button from "./UIelements/Button";
import Swal from "sweetalert2";

const PrivScreenItem = (props) => {
  console.log("ID: " + props.privScId);
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/editprivatescreen/${props.privScId}`);
  };

  const handleDeleteClick = async () => {
    Swal.fire({
      title: "Delete Private Screen",
      text: "Are you sure you want to delete this private screen?",
      icon: "warning",
      showCancelButton: true,
      // confirmButtonColor: "#3085d6",
      // cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `/privatescreen/deleteprivatescreen/${props.privScId}`
        );
        if (response.status === 200) {
          // Reload the current page after deletion
          window.location.reload();
        } else {
          window.alert(
            "Failed to delete the private screen. Please try again."
          );
        }
      } catch (err) {
        console.error(err);
        window.alert("An error occurred while deleting the private screen.");
      }
    }
    });
    
  };

  return (
    <li className="priv-sclist-item">
      <Card className="priv-sclist-item__content">
        <div className="priv-sclist-item__image">
          <img src={props.image} alt={props.privscname} />
        </div>
        <div className="priv-sclist-item__info">
          <h2>{props.privscname}</h2>
          <h3>Price(Rs): {props.privscprice}</h3>
          <p>
            Seat Capacity: <b>{props.privseatcapacity}</b>
          </p>
          <p>
            Location: <b>{props.privsclocation}</b>
          </p>
          <p>{props.privscdescription}</p>
        </div>
        <div className="priv-sclist-item__actions">
          <Button onClick={handleEditClick}>EDIT</Button>
          <Button onClick={handleDeleteClick} danger>
            DELETE
          </Button>
        </div>
      </Card>
    </li>
  );
};

export default PrivScreenItem;
