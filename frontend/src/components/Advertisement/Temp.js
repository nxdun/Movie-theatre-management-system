import React from 'react';
import './Temp.css';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const ButtonGroup = styled.div`
  display: flex;
`
// const button = styled.button`
//     background-color: black;
//     color: white;
//     font-size: 20px;
//     padding: 10px 60px;
//     border-radius: 5px;
//     margin: 10px 0px;
//     cursor: pointer;
//   `;

  const buttonStyle = {
    width: '500px', // Set a common width
    height: '40px', // Set a common height
    marginTop: '20px',
    marginBottom: '20px'
  };

 
    const Temp = () => {
    
        return (
          
          <div className = "box">
                  <ButtonGroup>
                      <button className = "button" type={'submit'} style={buttonStyle}> Add New Advertisement</button>
                      <button className = "button" type={'submit'} style={buttonStyle}> Add New Screen </button>
                      <button className = "button" type={'submit'} style={buttonStyle}> Add New Display </button>
                  </ButtonGroup>
  
                  <ButtonGroup>
                      <button className = "button" type={'submit'} style={buttonStyle}> Edit/Delete Advertisement </button>
                      <button className = "button" type={'submit'} style={buttonStyle}> Edit/Delete Screen </button>
                      <button className = "button" type={'submit'} style={buttonStyle}> Edit/Delete Display </button>    
                  </ButtonGroup>
  
                  <ButtonGroup>
                      <button className = "button" type={'submit'} style={buttonStyle}> View All Advertisements </button>
                      <button className = "button" type={'submit'} style={buttonStyle}> View All Screens </button>
                      <button className = "button" type={'submit'} style={buttonStyle}> View All Displays </button>
                  </ButtonGroup>
          </div>
        );
  };

export default Temp;