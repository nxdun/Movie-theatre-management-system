import "./Success.css";
import React from "react";



const Success = () => {
    return (
        <div className='success'>
            <img className ='success_logo' src="https://craftizen.org/wp-content/uploads/2019/02/successful_payment_388054.png" alt="logo" />
            <h1>Payment Successfull</h1>
            <p>Thank you for your payment.An automated payment recipt will be sent to your registred email.</p>
        </div>
    )
}
export default Success;