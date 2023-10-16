import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './paymentRecords.css';
import { Link } from 'react-router-dom';

const PaymentRecordsTable = () => {
    const [paymentRecords, setPaymentRecords] = useState([]);
    const [sortOrder, setSortOrder] = useState('desc');
  
    useEffect(() => {
      axios.get('http://localhost:3000/payment/paymentrecords') // Update the URL to match your server's URL
        .then((response) => {
          setPaymentRecords(response.data);
        })
        .catch((error) => {
          console.error('Error fetching payment records:', error);
        });
    }, []);
  
    const toggleSortOrder = () => {
      const newSortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
  
      // Sort the payment records by date (timeStamp)
      const sortedRecords = [...paymentRecords].sort((a, b) => {
        if (newSortOrder === 'asc') {
          return new Date(a.timeStamp) - new Date(b.timeStamp);
        } else {
          return new Date(b.timeStamp) - new Date(a.timeStamp);
        }
      });
  
      setSortOrder(newSortOrder);
      setPaymentRecords(sortedRecords);
    };
    const formatTimestamp = (timestamp) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      return new Date(timestamp).toLocaleDateString('en-US', options);
    };
    //print the table
    const downloadCSV = () => {
      const csvContent = "data:text/csv;charset=utf-8," + [
        ["Payment ID", "Email", "Phone Number", "Card Holder Name", "Total Cart Price", "Date and Time", "Cart Items"],
        ...paymentRecords.map((record) => [
          record._id,
          record.email,
          record.phoneNumber,
          record.cardHolderName,
          record.totalCartPrice,
          formatTimestamp(record.timeStamp),
          record.cartItems.map(item => `${item.name}: ${item.quantity} x LKR${item.price} = LKR${item.total}`).join("\n"),
        ])
      ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'payment_records.csv');
      document.body.appendChild(link);
      link.click();
    };

    return (
        <div className='PayTable'>
          <h2>Payment Records</h2>
          <div className='PayTableBody'>
            <Link to='/manager/dashboard'>
            <button className='pgoback'>Go back</button>
            </Link>
            <button className='pprint' onClick={downloadCSV}>Print</button>
            <button onClick={toggleSortOrder}>Sort by Date ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})</button>
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
                  <td>{formatTimestamp(record.timeStamp)}</td>
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
