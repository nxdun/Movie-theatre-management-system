import React from "react";

import PrivScreenItem from "./PrivScreenItem";
import Card from "./UIelements/Card";
import "./PrivScreenItem.css";

const PrivScreenList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="priv-sclist center">
        <Card>
          <h2>No screening rooms found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="priv-sclist">
      {props.items.map((privscreen) => (
        <PrivScreenItem
          key={privscreen._id}
          privScId={privscreen._id}
          image={privscreen.privscimage}
          privscname={privscreen.privscname}
          privscprice={privscreen.privscprice}
          privseatcapacity={privscreen.privseatcapacity}
          privsclocation={privscreen.privsclocation}
          privscdescription={privscreen.privscdescription}
        />
      ))}
    </ul>
  );
};

export default PrivScreenList;
