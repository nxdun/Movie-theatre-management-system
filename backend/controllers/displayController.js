const Display = require("../model/displayModel");


//create a display
const createDisplay = async (req, res) => {
    try {
        const display = await Display.create(req.body)
        res.status(200).json(display)
  
      } catch (error) {
          res.status(500).json({msg:error.message})
      }
};

//Get Read display
const getDisplays = async (req, res) => {
    try {
        const displays = await Display.find()
        res.status(200).json(displays)
  
      } catch (error) {
          res.status(500).json({msg:error.message})
      }
};

const getDisplay = async (req, res) => {
    try {
        const { id } = req.params;
        const display = await Display.findById(id);
        if(!display){
            return res.status(404).json(`No Display with id:${id}`);
        }
        res.status(200).json(display)
  
      } catch (error) {
          res.status(500).json({msg:error.message})
      }
};


//delete Display
const deleteDisplay = async (req, res) => {
    try {
        const { id } = req.params;
        const display = await Display.findByIdAndDelete(id);
        if(!display){
            return res.status(404).json(`No Display with id:${id}`);
        }
        res.status(200).send("Display Deleted")
  
      } catch (error) {
          res.status(500).json({msg:error.message})
      }
};

//update Display
const updateDisplay = async (req, res) => {
    try {
        const { id } = req.params;
        const display = await Display.findByIdAndUpdate({_id:id }, req.body, {
            new: true,
            runValidators: true,
        });
        if(!display){
            return res.status(404).json(`No Display with id:${id}`);
        }
        res.status(200).json(display);
  
      } catch (error) {
          res.status(500).json({msg:error.message})
      }
};


module.exports = {
    createDisplay,
    getDisplays,
    getDisplay,
    deleteDisplay,
    updateDisplay
};