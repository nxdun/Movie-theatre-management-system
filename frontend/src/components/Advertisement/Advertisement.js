import React, {  useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Adv.css";

const Advertisement = () => {
    const navigate = useNavigate();
   // const { _id } = useParams(); 

    const [advertisement, setAdv] = useState({
        name: "",
        description: "",
        startdate: "",
        enddate: "",
        type: "",

    });


    const handleChange = (e) => {
        const advClone = {...advertisement};
        advClone[e.target.name] = e.target.value;
        setAdv(advClone);
    } 


    const handleSubmit = async (e) =>{
        e.preventDefault();
       
        axios.post("/api/advertisements", advertisement)
        .then(res => {
            alert('Adv Added Successfully!');
            return navigate("/adv");
        }).catch (err => console.log(err));
        };

   
return (
        <div className="adv_wrapper">    
            <div className="container">
               <form onSubmit={handleSubmit}>    
                   <input 
                   type='text' 
                   placeholder='Title...' 
                   name='name'
                   value={advertisement.name} 
                   onChange={handleChange}
                   />
                   <input 
                   type='text' 
                   placeholder='Description...'
                   name='description' 
                   value={advertisement.description} 
                   onChange={handleChange}
                   />
                   <input 
                   type='date' 
                   placeholder='Startdate...'
                   name='startdate' 
                   value={advertisement.startdate} 
                   onChange={handleChange}
                   />
                   <input 
                   type='date' 
                   placeholder='Enddate...' 
                   name='enddate'
                   value={advertisement.enddate} 
                   onChange={handleChange}
                   />
                   <input 
                   type='text' 
                   placeholder='Type...' 
                   name='type'
                   value={advertisement.type} 
                   onChange={handleChange}
                   /> <br></br>
                    <br></br>
                   <button className="button4">Save</button>
                </form>
            </div>
        </div>
    );
 };

 export default Advertisement;
