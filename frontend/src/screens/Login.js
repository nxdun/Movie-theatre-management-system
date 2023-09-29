import React, { useEffect, useState } from 'react';
import './Login.css';

const LoginScreen = () => {
  // State to keep track of bubbles
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    function createBubble() {
      const newBubble = (
        <div
          key={Date.now()} // Unique key to identify each bubble
          style={{
            background: `#${Math.random().toString(16).substr(-6)}`,
            width: `${Math.random() * 500}px`,
            height: `${Math.random() * 500}px`,
            left: `${Math.random() * window.innerWidth}px`, // Adjusted for window width
            animationDuration: `${Math.random() * 10 + 10}s`,
            opacity: Math.random(),
          }}
          className="bubble"
        ></div>
      );

      // Add the new bubble to the array of bubbles
      setBubbles((prevBubbles) => [...prevBubbles, newBubble]);
    }

    const intervalId = setInterval(createBubble, 500);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="login-screen">
      <div className="bubbles-container">
        {/* Render the bubbles */}
        {bubbles.map((bubble) => bubble)}
      </div>

      <form className="form">
        <div className="form-title"><span>Sign in to your</span></div>
        <div className="title-2"><span>SPACE</span></div>
        <div className="input-container">
          <input className="input-mail" type="email" placeholder="Enter email" />
          <span> </span>
        </div>

        <section className="bg-stars">
          <span className="star"></span>
          <span className="star"></span>
          <span className="star"></span>
          <span className="star"></span>
        </section>

        <div className="input-container">
          <input className="input-pwd" type="password" placeholder="Enter password" />
        </div>
        <button type="submit" className="submit">
          <span className="sign-text">Sign in</span>
        </button>

        <p className="signup-link">
          No account?
          <a href="" className="up">Sign up!</a>
        </p>
      </form>
    </div>
  );
};

export default LoginScreen;
