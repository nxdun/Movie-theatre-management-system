import './Cancel.css'
import React from "react";
import {Link} from 'react-router-dom';


const Cancel = () => {
    return (
        <div class='cancel'>
            <img className ='cancel_logo' src="https://ortuk.org/wp-content/themes/ort/images/fail-img.png" alt="logo" />
            <h1>Payment Cancelled</h1>
               Your pyment has been canceled please <Link to="/shop">Go Back</Link>
        </div>
    )
}
export default Cancel;