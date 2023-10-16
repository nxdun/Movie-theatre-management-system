import React from "react";
import "./Login.css"; // Import your CSS file

const LoginScreen = () => {
  const ShootingStars = () => {
    const numStars = 20;
    const stars = [];

    for (let i = 0; i < numStars; i++) {
      const randomTop = `${Math.random() * 100}vh`; // Random top position between 0 and 100vh
      const randomLeft = `${Math.random() * 100}vw`; // Random left position between 0 and 100vw
      const randomDuration = `${Math.random() * 2 + 1}s`; // Random animation duration between 1s and 3s

      const starStyle = {
        top: randomTop,
        left: randomLeft,
        animationDuration: randomDuration,
      };

      stars.push(
        <span key={i} className={`star star-${i}`} style={starStyle} />
      );
    }

    return <section className="bg-stars">{stars}</section>;
  };

  return (
    <div className="container-login">
      <ShootingStars /> {/* Including my ShootingStars component */}
      <form className="form1">
        <div className="form-title">
          <span>The Cinema Universe</span>
        </div>
        <div className="title-2">
          <span>Log in</span>
        </div>
        <div className="input-container">
          <input
            className="input-mail"
            type="email"
            placeholder="Enter email"
          />
          <span> </span>
        </div>
        <div className="input-container">
          <input
            className="input-pwd"
            type="password"
            placeholder="Enter password"
          />
        </div>
        <button 
        type="submit" className="submitx">
          <span className="sign-text">Sign in</span>
        </button>
        <p className="signup-link">
          No account?{" "}
          <a href="" className="up">
            Sign up!
          </a> <a href="/manager" className="up">
            are you admin?
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginScreen;
