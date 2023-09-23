import "./LoyalityTable.css";
import LoyalitySearchBar from "./LoyalitySearchBar";
import React, { useState, useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import axios from "axios";

// createTheme creates a new theme named nadun that overrides the build in dark theme
createTheme(
  "tableTheme",
  {
    text: {
      primary: "#FFFFFF", // White text color
    },
    background: {
      default: "#222222", // Black background
    },
    context: {
      background: "#006600",
      text: "#FFFFFF",
    },
    divider: {
      default: "#444", // Color of the divider
      boxShadow: "1px 2px 9px #F4AAB9",
      margin: "4em",
      padding: "1em", // Add a 3D effect using boxShadow
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
      selected: "#555555", // Color for selected rows
      highlightOnHover: "#000000", // Color for rows on hover
      boxShadow: "0px 5px 8px 0px rgba(0, 0, 0, 0.5)", // 3D effect shadow
    },
    cells: {
      common: {
        boxShadow: "0 0 4px rgba(85, 85, 85, 0.5)", // 3D effect shadow
        border: "10px solid white", // Border color for cells
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
  const [data, setData] = useState("");
  const ReloadMe = () => {
    window.location.reload();
  };

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

  return (
    <div className="table">
      <LoyalitySearchBar onRefresh={ReloadMe} />
      <div>
        <DataTable
          columns={columns}
          data={data}
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
