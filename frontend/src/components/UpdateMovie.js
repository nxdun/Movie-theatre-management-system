import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function UpdateMovie() {

    const { userId } = useParams();

    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [director, setDirector] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [languages, setLanguages] = useState('');
    const [runtime, setRuntime] = useState("");
    const [Rating, setRating] = useState('');


    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8086/Movie/getOne/${userId}`);
                const movieData = response.data;

                setTitle(movieData.title);
                setGenre(movieData.genre);
                setDirector(movieData.director);
                setReleaseDate(movieData.releaseDate);
                setLanguages(movieData.languages);
                setRuntime(movieData.runtime);
                setRating(movieData.Rating);
            } catch (error) {
                alert('Data Load Unsuccessful: ' + error.message);
                console.log(error);
            }
        };

        fetchMovieDetails();
    }, [userId]);

    /*
    // This will exicute after click submit button
    function SendData(e) {
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

        axios.post("http://localhost:8086/Movie/addMovie", newMovie).then(() => {
            alert("Movie added");
        }).catch((err) => {
            alert(err)
        })
    }

    */



    const handleSubmit = async () => {
        try {
            const response = await axios.put(`http://localhost:8086/Movie/update`, {
                userId,
                title,
                genre,
                director,
                releaseDate,
                languages,
                runtime,
                Rating,
            });

            alert('Update success');
            // You can also update the local state with the updated data if needed.
            // For example:
            // setTitle(response.data.updatedMovie.title);
        } catch (error) {
            alert('Update unsuccessful: ' + error.message);
            console.log(error);
        }
    };

    const cancel = () => {
        //navigate(`/getUsers`);

    }



    return (
        <div className="container" >
            <div className="min-h-screen flex justify-center items-center bg-gray-100">
                <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                    <h1 className="text-3xl font-bold text-center text-primary mb-6">Update Movie Details</h1>
                    <form className="space-y-4" onSubmit={handleSubmit} >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label" >
                                Title
                                </label>
                                <input
                                    type="text"
                                    id="firstName"

                                    placeholder="First Name"
                                    className="form-control"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}

                                />
                            </div>


                            <div className="mb-3">

                            <label htmlFor="languages" className="form-label">Genre</label>
                                <select
                                        className="form-select"
                                        id="genre"
                                            onChange={(e) => {
                                        setGenre(e.target.value);
                                        }}
                            >
                                <option value="Action">Action</option>
                                <option value="Adventure">Adventure</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Drama">Drama</option>
                                <option value="Horror">Horror</option>
                                <option value="Science Fiction">Science Fiction</option>
                        </select>
                        </div>

  
                            
                        </div>
                        <div>
                            <label  htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Director
                            </label>
                            <input
                                type="text"
                                id="email"
                                placeholder="Email"
                                className="form-control"
                                value={director}
                                onChange={(e) => setDirector(e.target.value)}

                            />
                        </div>
                        <div>
                            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                            Release Date
                            </label>
                            <input
                                type="text"
                                id="age"
                                placeholder="Age"
                                className="form-control"
                                value={releaseDate}
                                onChange={(e) => setReleaseDate(e.target.value)}

                            />
                        </div>
                        <div>
                            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                            Languages
                            </label>
                            <input
                                type="text"
                                id="dob"
                                value={languages}
                                onChange={(e) => setLanguages(e.target.value)}
                                className="form-control"

                            />
                        </div>
                        <div>
                            <label htmlFor="" className="block text-sm font-medium text-gray-700">
                            Runtime
                            </label>
                            <input
                                type="text"
                                id="role"
                                placeholder="Role"
                                value={runtime}
                                onChange={(e) => setRuntime(e.target.value)}
                                className="form-control"

                            />
                        </div>
                        <div>
                            <label htmlFor="" className="block text-sm font-medium text-gray-700">
                            Rating
                            </label>
                            <input
                                type="text"
                                id="role"
                                placeholder="Role"
                                value={Rating}
                                onChange={(e) => setRating(e.target.value)}
                                className="form-control"

                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="button6"
                            >
                                Update
                            </button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}


