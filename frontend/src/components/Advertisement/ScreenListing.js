import React, { useEffect, useState } from "react";
import "./Adv.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ScreenListing = () => {

    const navigate = useNavigate();
    const [scrns, setScreens] = useState([]);

    useEffect(() => {
        const fetchScreens = async() => {
            try {
                const response = await axios.get("/api/screens/");
                setScreens(response.data);
            } catch (error) {
                console.error("Error fetching Screens:", error);
            }
        };
        fetchScreens();
    }, []);


    const handleDelete = async (screens) =>{
        try {
          setScreens(scrns.filter(a=> a._id !== screens._id));
    
          await axios.delete(`/api/screens/${screens._id}`)
        } catch (error) {
          console.log(error);
        }
      };

    return(
        <div className="screens">
        <br></br>
            <div className="container">
                <h2>Screen List</h2>
                <br></br>
                <button
                onClick={() => navigate("/screen/new")}
                className="button2">Add New Screen</button>
                <br></br>
                <br></br>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ScreenName</th>
                                <th className="expand">Location</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scrns.map((screens) =>(
                            <tr key={screens._id}>
                                <td> {screens.screenname} </td>
                                <td> {screens.location} </td>
                                <td>
                                    <button
                                        onClick={() => navigate(`/screen/${screens._id}`)}
                                        className="button1">Update</button>
                                </td>
                                <td>
                                <button
                                    onClick={() => handleDelete(screens)}
                                    className="button3">
                                    Delete
                                </button>
                                </td>
                            </tr>
                            ))} 
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ScreenListing;    