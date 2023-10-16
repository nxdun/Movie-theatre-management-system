import "./LoyalityTable.css";
import LoyalitySearchBar from "./LoyalitySearchBar";
import React, { useState, useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import axios from "axios";
import jsPDF from 'jspdf';
import Swal from "sweetalert2";


//theme for table
createTheme(
  "tableTheme",
  {
    text: {
      primary: "#222", // black text color
    },
    background: {
      default: "#fff", // white background
    },
    context: {
      background: "#006600",
      text: "#FFFFFF",
    },
    divider: {
      default: "#444", // Color of the divider
      boxShadow: "1px 2px 9px #F4AAB9",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
    },
    scrollbar: {
      thumb: "#333333", // Dark color for scrollbar thumb
      track: "#222222", // Dark color for scrollbar track
      hover: "#444444", // Dark color for scrollbar thumb on hover
    },
    rows: {
      main: "#333333", // Color for the main rows
      hover: "#555555", // Color for rows on hover
      selected: "#008000", // Color for selected rows
      highlightOnHover: "#000000", // Color for rows on hover
      boxShadow: "0px 5px 8px 0px rgba(0, 0, 0, 0.5)", // 3D effect shadow
    },
    cells: {
      common: {
        boxShadow: "0 0 4px rgba(85, 85, 85, 0.5)", // 3D effect shadow

        background: "#000000", // Background color for cells
      },
      header: {
        background: "#555555", // Background color for header cells
        color: "#FFFFFF", // Text color for header cells
      },
    },
  },
  "dark"
);

const LoyalityTable = (props) => {
  //querying search term
  const [searchTerm, setSearchTerm] = useState("");

  //column decalration
  const [columns, setColumns, sendRow] = useState([
    {
      name: "UserName",
      selector: (row) => row.UserName,
      sortable: true,
      width: "150px",
    },
    {
      name: "FirstName",
      selector: (row) => row.FirstName,
      sortable: true,
    },
    {
      name: "LastName",
      selector: (row) => row.LastName,
      sortable: true,
    },
    {
      name: "BirthDate",
      selector: (row) => row.BirthDate,
      sortable: true,
      format: (row) => {
        const datee = new Date(row.BirthDate);
        return isNaN(datee) || datee.getFullYear() === 1970
          ? "Not Assigned"
          : datee.toLocaleDateString();
      },
    },
    {
      name: "PhoneNumber",
      selector: (row) => row.PhoneNumber,
      sortable: true,
      width: "150px",
    },
    {
      name: "Gender",
      selector: (row) => row.Gender,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.Email,
      sortable: true,
      width: "200px",
    },
    {
      name: "optInForMarketing",
      selector: (row) => row.optInForMarketing,
      sortable: true,
      format: (row) => {
        return row.optInForMarketing ? "✓" : "X";
      },
      width: "100px",
      center: true,
    },
    {
      name: "Type",
      selector: (row) => row.Type,
      sortable: true,
      format: (row) => {
        return row.Type ? "Loyalty Member" : "Not a Loyalty Member";
      },
    },
    {
      name: "LoyaltyPoints",
      selector: (row) => row.LoyaltyPoints,
      sortable: true,
      format: (row) => {
        return row.LoyaltyPoints === null ? "Not Assigned" : row.LoyaltyPoints;
      },
      width: "150px",
      center: true,
    },
    {
      name: "LoyaltyRegisteredDate",
      selector: (row) => row.LoyaltyRegisteredDate,
      sortable: true,
      format: (row) => {
        const datee = new Date(row.LoyaltyRegisteredDate);
        return isNaN(datee) || datee.getFullYear() === 1970
          ? "Not Assigned"
          : datee.toLocaleDateString();
      },
      width: "150px",
    },
    {
      name: "PointResetDate",
      selector: (row) => row.PointResetDate,
      sortable: true,
      format: (row) => {
        const datee = new Date(row.PointResetDate);
        return isNaN(datee) || datee.getFullYear() === 1970
          ? "Not Assigned"
          : datee.toLocaleDateString();
      },
      width: "150px",
    },
  ]);
  // empty US var to set data
  const [data, setData] = useState([]);
  console.log("data = ", data);

  //reloading function
  const ReloadMe = () => {
    window.location.reload();
  };

//props navigation
  const getDataFromChild = (childData) => {
    setSearchTerm(childData);
  }
  //use effect for fetching data(customer)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/customer/");
        setData(response.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "error fetching data",
          text: "looks like database connection is not working",
        });
      }
    };

    fetchData();
  }, []); 
  

 

  //filter the data according to the search term for UserName
  const newData = data.filter((item) => {
    return item.UserName.toLowerCase().includes(searchTerm.toLowerCase());
  });


  
  //generator
  const generateInvoice = async () => {
     // Create a new jsPDF instance
  const doc = new jsPDF();

  // Define the content to be added to the PDF
  const content = document.getElementById('invoice-content'); // Assuming you have a container for your invoice content

  // Define your table data. This is just a sample; replace it with your actual data.
  const tableData = newData.map((row) => [
    row.UserName,
    row.FirstName,
    row.LastName,
    row.BirthDate,
    row.PhoneNumber,
    row.Gender,
    row.Email,
    row.optInForMarketing,
    row.Type,
    row.LoyaltyPoints,
    row.LoyaltyRegisteredDate,
    row.PointResetDate
  ]);
  console.log("tableData = ", tableData);

  // Set the table headers
  const tableHeaders = [
    ['UserName', 'FirstName', 'LastName', 'BirthDate', 'PhoneNumber', 'Gender', 'Email'
    , 'optInForMarketing', 'Type', 'LoyaltyPoints']
  ];;

  // Add the table to the PDF
  doc.autoTable({
    startY: 40, // Adjust the Y position as needed
    head: tableHeaders,
    body: tableData,
  });

// Get the current date
  const date = new Date();


// Get the individual date and time components
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
const day = String(date.getDate()).padStart(2, '0');
const hours = String(date.getHours()).padStart(2, '0');
const minutes = String(date.getMinutes()).padStart(2, '0');
const seconds = String(date.getSeconds()).padStart(2, '0');

// Create the formatted date and time string
const formattedDateTime = `${year}/${month}/${day} at ${hours}:${minutes}:${seconds}`;
  // Create the filename
  const filename = `Customer Report ${formattedDateTime}.pdf`;
  doc.save(filename);
  };
  
  if (props.isprinted) {
    generateInvoice();
    props.setisprinted(false);
    Swal.fire({icon: "success",title: "Printing success",text: "generated file is downloaded",});
  }


  return (
    <div className="table">

      <LoyalitySearchBar onRefresh={ReloadMe} sendDataToParent={getDataFromChild} />

      <div>
        <DataTable
          pagination={true}
          columns={columns}
          data={newData}
          selectableRows={true}
          persistTableHead={true}
          highlightOnHover={true}
          theme="tableTheme"
          customStyles={{
            cells: {
              style: {
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              },
            },
          }}
          noHeader={true}
          selectableRowsHighlight={true} // Enable row selection
          selectableRowsSelected={props.sselectedRowsIds} // Pass selected row IDs
          onSelectedRowsChange={({ selectedRows }) => {
            // Extract and store selected row IDss
            props.sendRow(selectedRows);
            props.ssetSelectedRowsIds(selectedRows.map((row) => row._id));
          }}
        />
      </div>
    </div>
  );
};



export default LoyalityTable;
