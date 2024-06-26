//authentication controller imports
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

//signup for users func: controller
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    next(error);
  }
};

//signin for users func: controller
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

//google authentication for sign in with google... async=await
export const google = async (req, res, next) => {
  try {
    //request from frontend for a email
    const user = await User.findOne({ email: req.body.email });
    //if user exists register the user || create token and save it in cookie
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
    //google signin do not having passwords || generate a password by `Math.random()`
    else {
      const generatedPassword =
        /*toString(26) means A-Z(26) + 0-9(10) = 26
        slice(-8) means gets last 8 digits of randomly made alphanumeric*/
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      //hash the password using 'bcrypt'
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      //save the new user
      const newUser = new User({
        username:
          /*convert `Dulanga Niroshan` to `dulanganiroshan8923` username 
          shouldn't be seperated, make it unique*/
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
          //pass email,pwd and avatar photo
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

//signout function is here
export const signOut = async (req, res, next) => {
  try {
    //clear cookie file from browser
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};
