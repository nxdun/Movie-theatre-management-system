import React from 'react'
import './Login.css'
const  LoginScreen = () => {

    return (
        
    <form class="form">
    <div class="form-title"><span>sign in to your</span></div>
     <div class="title-2"><span>SPACE</span></div>
     <div class="input-container">
       <input class="input-mail" type="email" placeholder="Enter email"/>
       <span> </span>
     </div>

     <section class="bg-stars">
       <span class="star"></span>
       <span class="star"></span>
       <span class="star"></span>
       <span class="star"></span>
     </section>

     <div class="input-container">
       <input class="input-pwd" type="password" placeholder="Enter password"/>
     </div>
     <button type="submit" class="submit">
       <span class="sign-text">Sign in</span>
     </button>

     <p class="signup-link">
       No account?
       <a href="" class="up">Sign up!</a>
     </p>
      
  </form>

    )

}

export default LoginScreen
