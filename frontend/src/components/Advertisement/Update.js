import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "./Adv.css";
//import Advertisement from './Advertisement';


function Update() {

    const { _id } = useParams();
  
    const[adve, setAdve] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/advertisements/'+_id)
        .then(res => setAdve(res.adve))
        .catch(err => console.log(err))
    }, [])

        function handleUpdate(event){
            event.preventDefault()
            axios.put('/adv/update/')
        }
        //axios.put(`/api/advertisements/update/`+_id, advertisement);

            //alert("Adv Updated Successfully !");
            //return navigate("/adv");


    return (
        <div className="adv_wrapper">    
            <div className="container">
                <h2>Update Advertisement</h2>
                <br></br>
               <form 
               //onSubmit={handleUpdate}
               > 
                   <input 
                   type='text' 
                   placeholder='Title...' 
                   name='name'
                   value={adve.name} 
                   onChange={e => setName(e.target.value)}
                   />
                   
                   <input 
                   type='text' 
                   placeholder='Description...'
                   name='description' 
                   value={adve.description} 
                   onChange={e => setDescription(e.target.value)}
                   />
                   
                   <input 
                   type='date' 
                   placeholder='Startdate...'
                   name='startdate' 
                   value={adve.startdate}
                   onChange={e => setStartdate(e.target.value)}
                   />
                   
                   <input 
                   type='date' 
                   placeholder='Enddate...' 
                   name='enddate'
                   value={adve.enddate} 
                   onChange={e => setEnddate(e.target.value)}
                   />
                   
                   <input 
                   type='text' 
                   placeholder='Type...' 
                   name='type'
                   value={adve.type}
                   onChange={e => setType(e.target.value)}
                   /> <br></br>
                    <br></br>
                   <button
                    //onClick={handleUpdate}
                    className="button1">Update</button>
                </form>
            </div>
        </div>
    );
}
 export default Update;
 