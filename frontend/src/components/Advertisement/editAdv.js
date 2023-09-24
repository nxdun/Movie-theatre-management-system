import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Adv.css';


export default function editAdv() {

    //const { id } = useParams();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startdate, setStartdate] = useState('');
    const [enddate, setEnddate] = useState('');
    const [type, setType] = useState('');


    useEffect(() => {
        const fetchAdvDetails = async () => {
            try {
                const response = await axios.get(`/advertisements/getOne/${id}`);
                const advData = response.data;
    
                setName(advData.name);
                setDescription(advData.description);
                setStartdate(advData.startdate);
                setEnddate(advData.enddate);
                setType(advData.type);
            } catch (error) {
                alert('Data Load Unsuccessful: ' + error.message);
                console.log(error);
            }
        };
    
        fetchAdvDetails();
    }, [id, name, description, startdate, enddate, type]);

    
    const handleSubmit = async () => {
        try {
            const response = await axios.put(`/adv/editAdv`, {
                
                name,
                description,
                startdate,
                enddate,
                type,
            });

            alert('Update success');
            // You can also update the local state with the updated data if needed.
          
        } catch (error) {
            alert('Update unsuccessful: ' + error.message);
            console.log(error);
        }
    };

    const cancel = () => {
        navigate(`/getUsers`);

    }



    return (
        <div className="container" >
            <div className="min-h-screen flex justify-center items-center bg-gray-100">
                <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                    <h1 className="text-3xl font-bold text-center text-primary mb-6">Edit Advertisement Details</h1>
                    <form className="space-y-4" onSubmit={handleSubmit} >
                        <div className="grid grid-cols-2 gap-4">

                            <div className="mb-3">
                                <label htmlFor="name" className="form-label" >
                                Title
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Title"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}

                                />
                            </div>
                            
                        </div>
                        <div>
                            <label  htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                            </label>
                            <input
                                type="text"
                                id="description"
                                placeholder="Description"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}

                            />
                        </div>
                        <div>
                            <label htmlFor="startdate" className="block text-sm font-medium text-gray-700">
                            StartDate
                            </label>
                            <input
                                type="date"
                                id="startdate"
                                placeholder="Startdate"
                                className="form-control"
                                value={startdate}
                                onChange={(e) => setStartdate(e.target.value)}

                            />
                        </div>
                        <div>
                            <label htmlFor="enddate" className="block text-sm font-medium text-gray-700">
                            Enddate
                            </label>
                            <input
                                type="date"
                                id="enddate"
                                placeholder="Enddate"
                                value={enddate}
                                onChange={(e) => setEnddate(e.target.value)}
                                className="form-control"

                            />
                        </div>
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                            Type
                            </label>
                            <input
                                type="text"
                                id="type"
                                placeholder="Type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="form-control"

                            />
                        </div>
                       
                        <div>
                            <button
                                type="submit"
                                className="button6">
                                Update
                            </button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    );
};

