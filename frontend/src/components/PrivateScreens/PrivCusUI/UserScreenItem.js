import React from "react";
import Card from "../UIelements/Card";
import "../PrivScreenItem.css";
import Button from "../UIelements/Button";
import { useNavigate } from "react-router-dom";

const UserScreenItem = (props) => {
  console.log("ID: " + props.privScId);
  const navigate = useNavigate();

  const handleBookNowClick = () => {
    navigate(`/PrivScBooking/${props.privScId}`, {
      state: {
        privscname: props.privscname,
        privscprice: props.privscprice,
      },
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
          <Button onClick={handleBookNowClick}>BOOK NOW</Button>
        </div>
      </Card>
    </li>
  );
};

export default UserScreenItem;
