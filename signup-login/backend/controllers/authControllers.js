import userModel from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Require Fields are missing!",
      });
    }

    const existingUser = await userModel.findOne({ email });
    console.log("existingUser", existingUser);

    if (existingUser) {
      return res.json({
        message: "Email Address is already existed!",
        status: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    console.log("hashPassword", hashPassword);

    const userObj = {
      ...req.body,
      password: hashPassword,
    };

    await userModel.create(userObj);

    res.json({
      message: "user created successfully..",
      status: true,
    });
  } catch (error) {
    res.json({
      message: error.message,
      status: false,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        message: "Required fields are missing!",
        status: false,
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        message: "Invalid Email or Password!",
        status: false,
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.json({
        message: "Invalid email or password!",
        status: false,
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // console.log("jwt token:" , token)

    res.json({
      message: "User Login Successfully!",
      status: true,
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};
