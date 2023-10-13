import React, { useState, useEffect } from "react";
import axios from "axios";
import './CSS/AllMovies.css';
import './CSS/Home.css';
import './myScript';
import Header from "../../shared/HomeHeader";
import { Link } from "react-router-dom";



export default function HomeMain() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get("/movie/");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div>     
    <Header/>
    <div class="slideshow-container">
        <div class="mySlides">
            <img src="image1.jpg" alt="Image 1"/>
        </div>
        <div class="mySlides">
            <img src="image2.jpg" alt="Image 2"/>
        </div>
        <div class="mySlides">
            <img src="image3.jpg" alt="Image 3"/>
        </div>


        <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
        <a class="next" onclick="plusSlides(1)">&#10095;</a>
    </div>





    
   
    <div className="fullContant">
        <div className="cont">
        {/* Display 5 movies in one row */}
        <div className="movie-row">
          {movies.slice(0, 5).map((movie, index) => (
            <div className="contn1" key={index}>
              <Link to="/Details">
                <img className="ima1" src={movie.director} alt="Movie Poster" width="95%" height="100%" />
              </Link>
              <h3 className="h3">{movie.title}</h3>
            </div>
          ))}
        </div>
      </div>

        <div className="contn2">
            <h2 className="hh" > Popular Movies</h2>
        </div>

        <div className="cont">
        {/* Display 5 movies in one row */}
        <div className="movie-row">
          {movies.slice(0, 5).map((movie, index) => (
            <div className="contn1" key={index}>
              <Link to="/Details">
                <img className="ima1" src={movie.director} alt="Movie Poster" width="95%" height="100%" />
              </Link>
              <h3 className="h3">{movie.title}</h3>
            </div>
          ))}
        </div>
      </div>

        <div className="contn2">
            <h2 className="hhh" > Recommended Movies</h2>
        </div>

        <div className="cont">
        {/* Display 5 movies in one row */}
        <div className="movie-row">
          {movies.slice(0, 5).map((movie, index) => (
            <div className="contn1" key={index}>
              <Link to="/Details">
                <img className="ima1" src={movie.director} alt="Movie Poster" width="95%" height="100%" />
              </Link>
              <h3 className="h3">{movie.title}</h3>
            </div>
          ))}
        </div>
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
  
  );
}
