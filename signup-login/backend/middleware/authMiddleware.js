import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      // console.log("No authorization header found");
      return res.status(401).json({
        message: "Token required. Please login first.",
        status: false,
      });
    }
    // console.log("authHeader" , authHeader)

    const token = authHeader.split(" ")[1];
    // console.log(token);

    if (!token) {
      return res.json({
        message: "Invalid Token Formate!",
        status: false,
      });
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("token decode", decodeToken.id);

    req.userId = decodeToken.id;

    next();
  } catch (error) {
    res.json({
      message: error.message,
      status: false,
    });
  }
};
