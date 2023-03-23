import User from "../models/User.js";

// Get All Users
export const getAllUsers = async (req, res) => {
    try {
      
      const user = await User.find()

      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };


  
// Get Single User
  export const getUser = async (req, res) => {
    try {
      const { id } = req.params
      const user = await User.findById(id)
      
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };