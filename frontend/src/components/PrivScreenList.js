import React from "react";

import PrivScreenItem from "./PrivScreenItem";
import Card from "./UIelements/Card";
import "../components/PrivScreenList.css";

const PrivScreenList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="priv-sclist center">
        <Card>
        <h2>No screening rooms found. Add Room maybe?</h2>
        <button>ADD ROOM</button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="priv-sclist">
      {props.items.map((privscreen) => (
        <PrivScreenItem
          key={privscreen.id}
          id={privscreen.id}
          image={privscreen.imageUrl}
          privscname={privscreen.privscname}
          privseatcapacity={privscreen.privseatcapacity}
          privscdescription={privscreen.privscdescription}
          privscprice={privscreen.privscprice}
          privsclocation={privscreen.privsclocation} 
        />
      ))}
    </ul>
  );


};

export default PrivScreenList;
