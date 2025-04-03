const User = require("./../../models/user/userModel");
const Admin = require("./../../models/admin/adminModel");

exports.getUserWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const user = await User.find().sort({ _id: -1 }).skip(skip).limit(limit);

    const totalUser = await User.count();
    res.status(200).json({
      status: "success",
      message: "successfully",
      user,
      totalUser,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.getTotalUser = async (req, res) => {
  try {
   
   

    const totalUser = await User.count();
    res.status(200).json({
      status: "success",
      message: "successfully",
     
      totalUser,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};




