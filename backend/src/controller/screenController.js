const Screen = require("../models/screenModel");


//create a screen
const createScreen = async (req, res) => {
    try {
        const screen = await Screen.create(req.body)
        res.status(200).json(screen)
  
      } catch (error) {
          res.status(500).json({msg:error.message})
      }
};

//Get Read screen
const getScreens = async (req, res) => {
    try {
        const screens = await Screen.find()
        res.status(200).json(screens)
  
      } catch (error) {
          res.status(500).json({msg:error.message})
      }
};


const getScreen = async (req, res) => {
    try {
        const { id } = req.params;
        const screen = await Screen.findById(id);
        if(!screen){
            return res.status(404).json(`No Screen with id:${id}`);
        }
        res.status(200).json(screen)
  
      } catch (error) {
          res.status(500).json({msg:error.message})
      }
};

//delete screen
const deleteScreen = async (req, res) => {
    try {
        const { id } = req.params;
        const screen = await Screen.findByIdAndDelete(id);
        if(!screen){
            return res.status(404).json(`No Screen with id:${id}`);
        }
        res.status(200).send("Screen Deleted")
  
      } catch (error) {
          res.status(500).json({msg:error.message})
      }
};

//update screen
const updateScreen = async (req, res) => {
    try {
        const { id } = req.params;
        const screen = await Screen.findByIdAndUpdate({_id:id }, req.body, {
            new: true,
            runValidators: true,
        });
        if(!screen){
            return res.status(404).json(`No Screen with id:${id}`);
        }
        res.status(200).json(screen);
  
      } catch (error) {
          res.status(500).json({msg:error.message})
      }
};

module.exports = {
    createScreen,
    getScreens,
    getScreen,
    deleteScreen,
    updateScreen
};