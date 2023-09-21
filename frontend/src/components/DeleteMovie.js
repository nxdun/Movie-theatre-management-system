// movieApi.js

import axios from "axios";

export const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:8086/Movie/delete/${id}`);
  } catch (error) {
    throw error; // You can handle the error as needed in your component
  }
};

