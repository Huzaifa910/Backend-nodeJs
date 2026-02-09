export const getUserProfile = async (req, res) => {
  // console.log(req.user.name , req.user.email)
  res.status(200).json({
    name: req.user.name,
    email: req.user.email,
  });
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "Name Required!",
        status: false,
      });
    }

    req.user.name = name;
    await req.user.save();

    res.status(200).json({
      message: "Profile Update Successfully!",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Profile Update error : " || error.message,
      status: true,
    });
  }
};
