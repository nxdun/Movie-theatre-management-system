import React, {useState} from "react";
import axios from "axios";


export default function AddMovie(){

    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [director, setDirector] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [languages, setLanguages] = useState("");
    const [runtime, setRuntime] = useState("");
    const [Rating, setRating] = useState("");

    // This will exicute after click submit button
    function SendData(e){      
        e.preventDefault();

        const newMovie = {
            title,
            genre,
            director,
            releaseDate,
            languages,
            runtime,
            Rating,
        }
    
        axios.post("http://localhost:8086/Movie/addMovie", newMovie).then(()=>{
          alert("Movie added");
        }).catch((err)=>{
          alert(err)
        })
    }
  
    return(
    <div className="container1" >
        <br/>
        <br/>
        <form onSubmit = {SendData}>
  <div className="mb-3">
    <label for="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" aria-describedby="emailHelp" onChange={(e)=>{
            setTitle(e.target.value);
    }}/>
  </div>
  <div className="mb-3">
    <label for="genre" className="form-label">Genre</label>
    <input type="text" className="form-control" id="genre" onChange={(e)=>{
            setGenre(e.target.value);
    }}/>
  </div>
  <div className="mb-3">
    <label for="director" className="form-label">Director</label>
    <input type="text" className="form-control" id="director" onChange={(e)=>{
            setDirector(e.target.value);
    }}/>
  </div>
  <div className="mb-3">
    <label for="releasedate" className="form-label">Release Date</label>
    <input type="text" className="form-control" id="releasedate" aria-describedby="emailHelp" onChange={(e)=>{
            setReleaseDate(e.target.value);
    }}/>
  </div>
  <div className="mb-3">
    <label for="languages" className="form-label">Languages</label>
    <input type="text" className="form-control" id="languages" onChange={(e)=>{
            setLanguages(e.target.value);
    }}/>
  </div>
  <div className="mb-3">
    <label for="runtime" className="form-label">Runtime</label>
    <input type="text" className="form-control" id="runtime" onChange={(e)=>{
            setRuntime(e.target.value);
    }}/>  
  </div>

  <div className="mb-3">
    <label for="rating" className="form-label">Rating</label>
    <input type="text" className="form-control" id="rating" onChange={(e)=>{
            setRating(e.target.value);
    }}/>  
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
    )
}


