import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './paymentRecords.css';

const PaymentRecordsTable = () => {
    const [paymentRecords, setPaymentRecords] = useState([]);
  
    useEffect(() => {
      axios.get('http://localhost:3000/payment/paymentrecords') // Update the URL to match your server's URL
        .then((response) => {
          console.log('Fetched data:', response.data); // Log the fetched data
          setPaymentRecords(response.data);
        })
        .catch((error) => {
          console.error('Error fetching payment records:', error);
        });
    }, []);
  
    console.log('Payment Records:', paymentRecords); // Log the paymentRecords state
  
  

    return (
        <div className='PayTable'>
          <h2>Payment Records</h2>
          <div className='PayTableBody'>
          <table>
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Card Holder Name</th>
                <th>Total Cart Price</th>
                <th>Date And Time</th>
                <th>Cart Items</th>
              </tr>
            </thead>
            <tbody>
              {paymentRecords.map((record) => (
                <tr key={record._id}>
                    <td>{record._id}</td>
                  <td>{record.email}</td>
                  <td>{record.phoneNumber}</td>
                  <td>{record.cardHolderName}</td>
                  <td>{record.totalCartPrice}</td>
                  <td>{record.timeStamp}</td>
                  <td>
                    <ul>
                      {record.cartItems.map((item, index) => (
                        <li key={index}>
                          {item.name}: {item.quantity} x LKR{item.price} = LKR{item.total}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      );
    };

export default PaymentRecordsTable;
