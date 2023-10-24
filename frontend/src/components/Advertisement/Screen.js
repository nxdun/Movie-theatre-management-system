import React, { useState, 
    //useEffect
 } from "react";
import axios from "axios";
import { useNavigate
    //, useParams 
} from "react-router-dom";
import "./Adv.css";

const Screen = () => {
    const navigate = useNavigate();
    //const { _id } = useParams();
    
    const [screens, setScreen] = useState({
        screenname: "",
        location: "",
    });

    /* useEffect(() => {
        if(_id === "new") return;

        const fetchScreen = async () => {
            const { data } = await axios.get(`/screen/${_id}`);
            setScreen(data);
        };
        fetchScreen();
    }, [_id]); */


    const handleChange = (e) => {
        const screenClone = { ...screens };
        screenClone[e.target.name] = e.target.value;
        setScreen(screenClone);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
    
        axios.post("/api/screens", screens)
        .then(res => {
            alert('Screen Added Successfully!');
            return navigate("/screen");
        }).catch (err => console.log(err));
        };

    return(
        <div className="screen_wrapper">
            <div className="container">
                <h2>Single Screen</h2>
                <br></br>
                <form onSubmit={handleSubmit}>
                    <input 
                        type='text'
                        placeholder="Screen Name..."
                        name='screenname' 
                        value={screens.screenname}
                        onChange={handleChange}
                    />
                    <input 
                        type='text'
                        placeholder="Screen Location..." 
                        name='location'
                        value={screens.location}
                        onChange={handleChange}
                    /><br></br>
                    <br></br>
                    <button className="button4">Save</button>
                </form>
            </div>
        </div>
    );
};

export default Screen;