// movieApi.js
import './CSS/AllMovies.css';
import axios from "axios";

export const handleDelete = async (id) => {
  try {
    await axios.delete(`/movie/delete/${id}`);
  } catch (error) {
    throw error; // You can handle the error as needed in your component
  }
};

