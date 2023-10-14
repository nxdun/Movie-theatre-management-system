import "./LoyalityTable.css";
import LoyalitySearchBar from "./LoyalitySearchBar";
import React, { useState, useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import axios from "axios";
import easyinvoice from 'easyinvoice';

// createTheme creates a new theme named nadun that overrides the build in dark theme
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
  const ReloadMe = () => {
    window.location.reload();
  };


  
  const getDataFromChild = (childData) => {
    setSearchTerm(childData);
    
    
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/customer/");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Emptyy dependency array ensures this effect ruuns once when the component mounts

  //filter the data according to the search term for UserName
  const newData = data.filter((item) => {
    return item.UserName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  var d = {
    // Customize enables you to provide your own templates
    // Please review the documentation for instructions and examples
    "customize": {
        //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
    },
    "images": {
        // The logo on top of your invoice
        "logo": "",
        // The invoice background
        "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg"
    },
    // Your own data
    "sender": {
        "company": "Galaxy cinemas",
        "address": "the street 123",
        "zip": "1234 ZIP",
        "city": "Colombo",
        "country": "Sri Lanka"
  
    },
    // Your recipient
    "client": {
        "company": "Client Corp",
        "address": "Clientstreet 456",
        "zip": "4567 CD",
        "city": "Clientcity",
        "country": "Clientcountry"
        // "custom1": "custom value 1",
        // "custom2": "custom value 2",
        // "custom3": "custom value 3"
    },
    "information": {
        // Invoice number
        "number": "2021.0001",
        // Invoice data
        "date": "{}",
        // Invoice due date
        "due-date": "31-12-2021"
    },
    // The products you would like to see on your invoice
    // Total values are being calculated automatically
    "products": [
        {
            "quantity": 2,
            "description": "Product 1",
            "tax-rate": 6,
            "price": 33.87
        },
        {
            "quantity": 4.1,
            "description": "Product 2",
            "tax-rate": 6,
            "price": 12.34
        },
        {
            "quantity": 4.5678,
            "description": "Product 3",
            "tax-rate": 21,
            "price": 6324.453456
        }
    ],
    // The message you would like to display on the bottom of your invoice
    "bottom-notice": "this is a auto generated report.",
    // Settings to customize your invoice
    "settings": {
        "currency": "USD", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
        // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')        
        // "margin-top": 25, // Defaults to '25'
        // "margin-right": 25, // Defaults to '25'
        // "margin-left": 25, // Defaults to '25'
        // "margin-bottom": 25, // Defaults to '25'
        // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
        // "height": "1000px", // allowed units: mm, cm, in, px
        // "width": "500px", // allowed units: mm, cm, in, px
        // "orientation": "landscape", // portrait or landscape, defaults to portrait
    },
    // Translate your invoice to your preferred language
    "translate": {
        // "invoice": "FACTUUR",  // Default to 'INVOICE'
        // "number": "Nummer", // Defaults to 'Number'
        // "date": "Datum", // Default to 'Date'
        // "due-date": "Verloopdatum", // Defaults to 'Due Date'
        // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
        // "products": "Producten", // Defaults to 'Products'
        // "quantity": "Aantal", // Default to 'Quantity'
        // "price": "Prijs", // Defaults to 'Price'
        // "product-total": "Totaal", // Defaults to 'Total'
        // "total": "Totaal", // Defaults to 'Total'
        // "vat": "btw" // Defaults to 'vat'
    },
  };
  
  //generator
  const generateInvoice = async () => {
    try {
      await easyinvoice.createInvoice(d, function(result) {
        easyinvoice.print(result.pdf);
        props.setisprinted(!props.isprinted);
      });
    } catch (error) {
      if (error.message.includes("throttle")) {
        // Handle throttle exception based on the error message
        console.error("Throttle Exception: Too many requests. Please try again later.");
      } else {
        // Handle other exceptions if needed
        console.error("An error occurred while generating the invoice:", error);
      }
    }
  };
  
  if (props.isprinted) {
    generateInvoice();
    props.setisprinted(false);
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
            // Extract and store selected row IDs
            props.sendRow(selectedRows);
            props.ssetSelectedRowsIds(selectedRows.map((row) => row._id));
          }}
        />
      </div>
    </div>
  );
};



export default LoyalityTable;
