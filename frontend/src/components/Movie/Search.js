// Search.js
import React, { useState } from 'react';
import './Search.css'; // Import the CSS file


const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const movieTitles = [
    'Oppenheimer',
    'The Godfather',
    'The Little Mermaid',
    'TGuardian of the galaxy',
    'The Godfather',
    'Fast X',
    'The Adam Project',
    'Forrest Gump',
    'avatar'
    // Add more movie titles here
  ];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter movie titles based on the input value
    const filteredTitles = movieTitles.filter((title) =>
      title.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filteredTitles);
  };

  const handleSearch = () => {
    // Perform the search action with the searchTerm
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className='se'>
      <input className='input1'
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button className='button1' onClick={handleSearch}>Search</button>
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
