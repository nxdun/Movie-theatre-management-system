import React, {useState} from "react";
import axios from "axios";
import mainp from './Images/main.jpeg';
import pic1 from './Images/p1.jpeg'
import pic2 from './Images/p2.jpeg';
import pic3 from './Images/p3.jpeg';
import pic4 from './Images/p4.jpeg';
import pic5 from './Images/p5.jpeg';


export default function HomeMain(){
  
    return(
        <div>
        <div className="cont">
            <div className="cont1">
                <h1 className="h1">Avatar :</h1>
                <h1 className="h1">The way of water</h1>
            </div>
            <div className="cont2">
                <img className="ima" src={mainp} alt="My Image" width="95%" height= "100%" />
            
            </div>
        </div>

        <div className="contn">
            
            <div className="contn1">          
            <img className="ima1" src={pic1} alt="My Image" width="95%" height= "100%" />
            <h3 className="h3">Oppenheimer</h3>
            </div>
            <div className="contn1">
            <img className="ima1" src={pic5} alt="My Image" width="95%" height= "100%" />
            <h3 className="h3">The Little Mermaid </h3> 
            </div>
            <div className="contn1">
            <img className="ima1" src={pic3} alt="My Image" width="95%" height= "100%" />
            <h3 className="h3">Spider-man </h3>
            </div>
            <div className="contn1">
            <img className="ima1" src={pic4} alt="My Image" width="95%" height= "100%" />
            <h3 className="h3">Guardian of the galaxy</h3>
            </div>
            <div className="contn1">
            <img className="ima1" src={pic2} alt="My Image" width="95%" height= "100%" />
            <h3 className="h3">Fast X</h3>
            </div>

        </div>

        <div className="contn2">
            <h2 className="hh" > Popular Movies</h2>
        </div>

        <div className="contn">
            
            <div className="contn1">          
            <img className="ima1" src={pic1} alt="My Image" width="95%" height= "100%" />
            <h3 className="h3">Oppenheimer</h3>
            </div>
            <div className="contn1">
            <img className="ima1" src={pic5} alt="My Image" width="95%" height= "100%" />
            <h3 className="h3">The Little Mermaid </h3> 
            </div>
            <div className="contn1">
            <img className="ima1" src={pic3} alt="My Image" width="95%" height= "100%" />
            <h3 className="h3">Spider-man </h3>
            </div>
            <div className="contn1">
            <img className="ima1" src={pic4} alt="My Image" width="95%" height= "100%" />
            <h3 className="h3">Guardian of the galaxy</h3>
            </div>
            <div className="contn1">
            <img className="ima1" src={pic2} alt="My Image" width="95%" height= "100%" />
            <h3 className="h3">Fast X</h3>
            </div>

        </div>

        <div className="contn2">
            <h2 className="hhh" > Recommended Movies</h2>
        </div>

        <div className="contn">
            
            <div className="contn1">          
            <img className="ima1" src={pic1} alt="My Image" width="95%" height= "100%" />
            <h3 className="h3">Oppenheimer</h3>
            </div>
            <div className="contn1">
            <img className="ima1" src={pic5} alt="My Image" width="95%" height= "100%" />
            <h3 className="h3">The Little Mermaid </h3> 
            </div>
            <div className="contn1">
            <img className="ima1" src={pic3} alt="My Image" width="95%" height= "100%" />
            <h3 className="h3">Spider-man </h3>
            </div>
            <div className="contn1">
            <img className="ima1" src={pic4} alt="My Image" width="95%" height= "100%" />
            <h3 className="h3">Guardian of the galaxy</h3>
            </div>
            <div className="contn1">
            <img className="ima1" src={pic2} alt="My Image" width="95%" height= "100%" />
            <h3 className="h3">Fast X</h3>
            </div>

        </div>


    <footer class="site-footer">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <h6>About</h6>
            <p class="text-justify">Welcome to our Movie Theater Management System! We take pride in revolutionizing the movie-going experience through cutting-edge technology. Our platform seamlessly handles ticket bookings, concessions, and scheduling, ensuring a hassle-free and enjoyable time at the cinema. With user-friendly interfaces and robust backend support, we empower theater owners to streamline operations and engage audiences. Join us in shaping the future of cinematic entertainment, where efficiency meets the magic of the silver screen.</p>
          </div>

          <div class="col-xs-6 col-md-3">
            <h6>Categories</h6>
            <ul class="footer-links">
              <li><a href="http://scanfcode.com/category/c-language/">Popular Movies</a></li>
              <li><a href="http://scanfcode.com/category/front-end-development/">Popular Movies</a></li>
              <li><a href="http://scanfcode.com/category/back-end-development/">Popular Movies</a></li>
              <li><a href="http://scanfcode.com/category/java-programming-language/">Popular Movies</a></li>
              <li><a href="http://scanfcode.com/category/android/">Popular Movies</a></li>
              <li><a href="http://scanfcode.com/category/templates/">Popular Movies</a></li>
            </ul>
          </div>

          <div class="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul class="footer-links">
              <li><a href="http://scanfcode.com/about/">About Us</a></li>
              <li><a href="http://scanfcode.com/contact/">Contact Us</a></li>
              <li><a href="http://scanfcode.com/contribute-at-scanfcode/">Contribute</a></li>
              <li><a href="http://scanfcode.com/privacy-policy/">Privacy Policy</a></li>
              <li><a href="http://scanfcode.com/sitemap/">Sitemap</a></li>
            </ul>
          </div>
        </div>

      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text">Copyright &copy; 2023 All Rights Reserved by 
         <a href="#"> Galaxy Cinema </a>.
            </p>
          </div>

          <div class="col-md-4 col-sm-6 col-xs-12">
            <ul class="social-icons">
              <li><a class="facebook" href="#"><i class="fa fa-facebook"></i></a></li>
              <li><a class="twitter" href="#"><i class="fa fa-twitter"></i></a></li>
              <li><a class="dribbble" href="#"><i class="fa fa-dribbble"></i></a></li>
              <li><a class="linkedin" href="#"><i class="fa fa-linkedin"></i></a></li>   
            </ul>
          </div>
        </div>
      </div>
</footer>

        </div>

       
    )
}

