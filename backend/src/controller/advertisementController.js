const Advertisement = require("../models/advertisementModel");


//create a advertisement
const createAdvertisement = async (req, res) => {
    try {
        const advertisement = await Advertisement.create(req.body)
        res.status(200).json(advertisement)
  
      } catch (error) {
          res.status(500).json({msg:error.message})
      }
};

//Get Read advertisement
const getAdvertisements = async (req, res) => {
    try {
        const advertisements = await Advertisement.find()
        res.status(200).json(advertisements)
  
      } catch (error) {
          res.status(500).json({msg:error.message})
      }
};

const getAdvertisement = async (req, res) => {
    try {
        const { id } = req.params;
        const advertisement = await Advertisement.findById(id);
        if(!advertisement){
            return res.status(404).json(`No Advertisement with id:${id}`);
        }
        res.status(200).json(advertisement)
  
      } catch (error) {
          res.status(500).json({msg:error.message})
      }
};

const deleteAdvertisement = async (req, res) => {
    try {
        const { id } = req.params;
        const advertisement = await Advertisement.findByIdAndDelete(id);
        if(!advertisement){
            return res.status(404).json(`No Advertisement with id:${id}`);
        }
        res.status(200).send("Advertisement Deleted")
  
      } catch (error) {
          res.status(500).json({msg:error.message})
      }
};
const updateAdvertisement = async (req, res) => {
    try {
        const { id } = req.params;
        const advertisement = await Advertisement.findByIdAndUpdate({_id:id }, req.body, {
            new: true,
            runValidators: true,
        });
        if(!advertisement){
            return res.status(404).json(`No Advertisement with id:${id}`);
        }
        res.status(200).json(advertisement);
  
      } catch (error) {
          res.status(500).json({msg:error.message})
      }
};

module.exports = {
    createAdvertisement,
    getAdvertisements,
    getAdvertisement,
    deleteAdvertisement,
    updateAdvertisement
};