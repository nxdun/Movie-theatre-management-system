import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Card from "./UIelements/Card";
import "./PrivScreenItem.css";
import Button from "./UIelements/Button";


const PrivScreenItem = (props) => {
  console.log("ID: " + props.privScId);
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/editprivatescreen/${props.privScId}`);
  };

  const handleDeleteClick = async () => {
    if (
      window.confirm("Are you sure you want to delete this private screen?")
    ) {
      try {
        const response = await axios.delete(`/privatescreen/deleteprivatescreen/${props.privScId}`);
        if (response.status === 200) {
          // Refresh the list of private screens after deletion
          // You may fetch the updated list or use state to remove the deleted item
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
