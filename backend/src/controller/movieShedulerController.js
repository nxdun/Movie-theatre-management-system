const MovieShedular = require('../models/movieShedulerModel');



// Adding MovieShedular details
const addMovieDetails = async (req, res) => {
    const data = req.body;
    const { TheaterName, ShowTime, StartDate, EndDate } = data;

    try {
        // Check if a record with the same theater name and show time exists
        const existingRecord = await MovieShedular.findOne({
            TheaterName,
            ShowTime,
        });

        if (existingRecord) {
            // Check if the new date range overlaps with the existing record's date range
            if (
                (StartDate >= existingRecord.StartDate && StartDate <= existingRecord.EndDate) ||
                (EndDate >= existingRecord.StartDate && EndDate <= existingRecord.EndDate)
            ) {
                return res.status(400).json({
                    message: "This schedule entry already exists and overlaps with the existing date range."
                });
            }
        }

        const newData = new MovieShedular(data);
        await newData.save();

        return res.status(200).json({
            status: '404',
            message: "Data added successfully"
        });
    } catch (err) {
        return res.status(400).json({
            message: err.message
        });
    }
}


//Get Movie Schedule find by Time and Shedule 
const getMovieSheduleByTimeAndTheater = async (req, res) => {
    try {

        const { TheaterName , ShowTime } = req.body;
        const data = await MovieShedular.findOne({ TheaterName: TheaterName , ShowTime: ShowTime });
        if (data) {

            return res.status(200).json({
                message: "data found", data,
                status : 2100
            });
        }else{
            
            return res.status(200).json({
                message: "No Data found", data,
                status : 2200
            });
        }

    } catch(err) {

        return res.status(400).json({
            message:err
        });
    }
}



//get all acount details
const getallMovieShedularDetails =  async (req,res) => {
    try{
        const MovieShedularData = await MovieShedular.find().sort({"createdAt":-1});
        return res.status(200).send({
            data:MovieShedularData,
            status:2100
        });

    }catch(err){

        return res.status(500).send({
            message:err,
            
        })

    }
}


//get all acount details
const getallMovieShedularByID =  async (req,res) => {
    try{
        const id = req.params.id;
        const MovieShedularData = await MovieShedular.findById(id);
        return res.status(200).send({
            data:MovieShedularData
        });

    }catch(err){

        return res.status(500).send({
            message:err
        })

    }
}

// Define the controller function
const getMovieShedularDetailsByMovieId = async (req, res) => {
    try {
      const objectId = req.params.id; // Capture the "_id" from the URL parameter
  
      // Query the database to find movie scheduling details by MongoDB ObjectId (_id)
      const movieShedularDetails = await MovieShedular.findById(objectId);
  
      if (movieShedularDetails) {
        return res.status(200).json({
          data: movieShedularDetails,
          status: 2100
        });
      } else {
        return res.status(404).json({
          message: "Movie scheduling details not found"
        });
      }
    } catch (err) {
      return res.status(500).json({
        message: err
      });
    }
  };

const updateMovieShedularDetails = async (req, res) => {
    try {
      const id = req.params.id;
      const updatedData = req.body;
  
      // Use await to wait for the update operation to complete
      const result = await MovieShedular.findByIdAndUpdate(id, { $set: updatedData });
  
      if (!result) {
        // If no document was found with the given id
        return res.status(404).json({
          message: "Movie scheduler not found."
        });
      }
  
      return res.status(200).json({
        message: "Updated successfully!",
        status:2100
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "Internal Server Error"
      });
    }
  };
  

const deleteMovieShedularDetails = async (req, res) => {
    try {
        const deletedMovieShedular = await MovieShedular.findByIdAndRemove(req.params.id).exec();

        if (!deletedMovieShedular) {
            return res.status(404).json({
                message: "Movie schedule not found",
            });
        }

        return res.status(200).json({
            success: "Movie schedule removed successfully",
            deletedMovieShedular,
            status:2100
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "An error occurred while deleting the movie schedule",
        });
    }
};



module.exports = {
    addMovieDetails,
    getallMovieShedularDetails,
    updateMovieShedularDetails,
    deleteMovieShedularDetails,
    getallMovieShedularByID,
    getMovieSheduleByTimeAndTheater,
    getMovieShedularDetailsByMovieId
}