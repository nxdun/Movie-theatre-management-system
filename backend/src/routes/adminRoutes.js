const express = require('express');
const router = express.Router();
const { addMovieDetails , getMovieSheduleByTimeAndTheater ,getallMovieShedularDetails,updateMovieShedularDetails ,deleteMovieShedularDetails } = require('../controller/movieShedulerController')


router.post('/addMovieDetails',addMovieDetails);
router.post('/getMovieSheduleByTimeAndTheater',getMovieSheduleByTimeAndTheater);
router.get('/getallMovieShedularDetails',getallMovieShedularDetails);
router.delete('/deleteMovieShedularDetails/:id',deleteMovieShedularDetails);
router.put('/updateMovieShedularDetails/:id',updateMovieShedularDetails);

module.exports = router;