import React, {useState} from "react";
import axios from "axios";
import mainp from './Images/main.jpeg';
import pic1 from './Images/p1.jpeg'
import pic2 from './Images/p2.jpeg';
import pic3 from './Images/p3.jpeg';
import pic4 from './Images/p4.jpeg';
import pic5 from './Images/p5.jpeg';


export default function DetailsM(){
  
    return(
    <div>
        <div className="contD">
        <a href={'/addMovie'}><button className="button8">Buy Tickets</button></a>
        </div>

        <div className="contn3">
            <h2 className="hh2" > Movie Trailer</h2>
        </div>

        <iframe className="video" width="60%" height="500px" src="https://www.youtube.com/embed/d9MyW72ELq0" frameborder="0" allowfullscreen></iframe>



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

