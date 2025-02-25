import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser){
      res.status(400).json({ message: "User already exists" });
        return;
    }
    //hashPassword
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashPassword,
      role,
    });
    await user.save();
    const token = JWT.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!
    );
    res.status(201).json({
      message: "User registered successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    //Find User
    const user = await User.findOne({ email });
    if (!user) { res.status(400).json({ message: "Invalid Credentials" });
    return;
}

    //Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      { res.status(400).json({ message: "Invalid credentials" });}

    //Generate JWT Token
    const token = JWT.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!
    );
    res.status(201).json({
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.body;

    //verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { email, name, sub } = ticket.getPayload()!;
    //Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      //Create new user
      user = new User({
        name,
        email,
        password: sub,
      });
      await user.save();
    }

    if (!user) {
      res.status(500).json({ message: "User creation failed" });
      return;
    }

    //Generate JWT Token
    const jwtToken = JWT.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!
    );
    res.status(201).json({
      message: "Login Successfully",
      token: jwtToken,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Google login failed" });
  }
};
