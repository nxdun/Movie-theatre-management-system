import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ViewAdv = () => {
    //const [user, setUser] = useState({});

    //const { _id } = useParams();

    useEffect(() => {
        fetch("/api/advertisements/" +_id).then((res) =>{
            return res.json();
        }).then((resp) => {

        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    //const[_id, inchange] = useState("");
    const[name, namechange] = useState("");


    const navigate = useNavigate();

    const handleSubmit=(e) => {
        e.priventDefault();
        const advertisements = {name, description, startdate, enddate, type};

    }
    return (
        <div>
            <h2>View</h2>
        </div>
    );
};

export default ViewAdv;