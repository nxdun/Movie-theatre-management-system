import React from "react";

import Card from "./UIelements/Card";
import "../components/PrivScreenItem.css";
import Button from "./PrivateScreenForm/Button";


const PrivScreenItem = (props) => {
    return <li className="priv-sclist-item">
        <Card className="priv-sclist-item__content">
        <div className="priv-sclist-item__image">
            <img src={props.image} alt={props.privscname} />
        </div>
        <div className="priv-sclist-item__info">
            <h2>{props.privscname}</h2>
            <h3>Price(Rs):  {props.privscprice}</h3>
            <p>Seat Capacity:    <b>{props.privseatcapacity}</b></p>
            <p>Location:    <b>{props.privsclocation}</b></p>  
            <p>{props.privscdescription}</p>
         </div>
        <div className="priv-sclist-item__actions">
            <Button to={`/privateScreen/${props.id}`}>EDIT</Button>
            <Button danger>DELETE</Button>
        </div>
        </Card>
    </li>;   







};

export default PrivScreenItem;