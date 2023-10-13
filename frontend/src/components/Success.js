import "./Success.css";
import React from "react";
import { useState, useEffect } from "react";


const Success = () => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate a delay for the loading effect (you can adjust the delay as needed)
        const loadingTimeout = setTimeout(() => {
          setIsLoading(false); // Set loading state to false after the delay
        }, 5000); // 2000 milliseconds (2 seconds) delay
    
        return () => {
          clearTimeout(loadingTimeout); // Clear the timeout when the component unmounts
        };
      }, []);

    return (
        <div>
            {isLoading ? (
      <div class="sloader">
      <p>Processing</p>
      <div class="swords">
          <span class="sword">Payment</span>
          <span class="sword">Please</span>
          <span class="sword">Wait</span>
          <span class="sword">Payment</span>
          <span class="sword">Success</span>
      </div>
    </div>
    ) : (

        <div className='success'>
            <img className ='success_logo' src="https://craftizen.org/wp-content/uploads/2019/02/successful_payment_388054.png" alt="logo" />
            <h1>Payment Successfull</h1>
            <p>Thank you for your payment.Your Payment Invoice can be downloaded from below button.</p>
            <p>You can show this recipt at the counter to collect your items.</p> 
            <p>Thank you for choosing our online service!.</p>
            <button class="sucbutton">
            <span class="sucbutton-content">Download Invoice</span>
            </button>
        </div>
        )}
        </div>
    )
}
export default Success;