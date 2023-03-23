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


// Get User Friends
export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)

            const friends = await Promise.all(
            user.friends.map((id) => id)
            // user.friends.map((id) => User.findById(id)) // not working
        );

        
        res.status(200).json({friends})

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}


// addRemoveFriend 

export const addRemoveFriend = async (req, res) => {
    try {
        const {id, friendId} = req.params
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
          } else {
            user.friends.push(friendId);
            friend.friends.push(id);
          }

          await user.save();
          await friend.save();

          const friends = await Promise.all(
              user.friends.map((id) => User.findById(id))
              );
              
          res.status(200).json(friends);

    } catch (error) {
        res.status(404).json({ message: err.message });
    }
}