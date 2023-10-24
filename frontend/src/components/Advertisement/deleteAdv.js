
import './Adv.css';
import axios from "axios";

export const handleDelete = async (id) => {
  try {
    await axios.delete(`/advertisement/delete/${id}`);
  } catch (error) {
    throw error; 
  }
};