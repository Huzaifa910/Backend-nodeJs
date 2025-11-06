import express, { urlencoded } from "express";
import mongoose from "mongoose";
import UserModel from "./model/userSchema.js";
import bcrypt from "bcrypt";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

// mongoDB connection
let URI = ""
mongoose
  .connect(URI)
  .then((res) => console.log("MongoDB connected successfully"))
  .catch((error) =>
    console.log("Something went wrong in mongoDB connection", error.message)
  );

app.post("/signup", async (request, response) => {
  try {
    const { name, age, email, password } = request.body;

    if (!email || !password) {
      return response.json({
        message: "Required fields are missing!",
        status: false,
      });
    }

    // get user by email
    const user = await UserModel.findOne({ email });
    console.log("user", user);

    if (user) {
      return response.json({
        message: "Email address is already existed!",
        status: false,
      });
    }

    // create and save new user
    const newUser = new UserModel({ name, age, email, password });
    // await newUser.save();

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);
    console.log("hashPassword", hashPassword);

    const userObj = {
      ...request.body,
      password: hashPassword,
    };
    // create user in db
    await UserModel.create(userObj);

    response.json({
      message: "user successfully created!",
      status: true,
    });
  } catch (error) {
    response.json({
      message: error.message,
      status: false,
    });
  }
});

app.post("/login", async (request, response) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return response.json({
      message: "Required fields are missing",
      status: false,
    });
  }

  const user = await UserModel.findOne({ email });

  try {
    if (!user) {
      return response.json({
        message: "invalid Email or Password",
        status: false,
      });
    }

    const comparePass = await bcrypt.compare(password, user.password);
    // console.log(comparePass);

    if (!comparePass) {
      return response.json({
        message: "Invalid Email or Password",
        status: false,
      });
    }

    return response.json({
      message: "User Login Successfully",
      status: true,
    });

  } catch (error) {
    response.json({
      message: error.message,
      status: false,
    });
  }
});

app.listen(PORT, () => console.log(`server in running on PORT :: ${PORT}`));
