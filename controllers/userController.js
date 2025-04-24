import dotenv from "dotenv";
import { createNewUser, findUserByEmail } from "../models/userModel.js";
import bcrypt from "bcrypt";
dotenv.config();
import jwt from "jsonwebtoken";

const createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, position, password } = req.body;

    //check to see if form is complete
    if (!firstname || !lastname || !email || !position || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    //check to see if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const newUser = await createNewUser(
      firstname,
      lastname,
      email,
      position,
      hashedpassword
    );
    if (!newUser) {
      return res.status(400).json({ message: "Unable to create new user." });
    }

    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        position: newUser.position,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const authenicateUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields must be filled out." });
    }

    const existingUser = await findUserByEmail(email);
    if (!existingUser) {
      return res.status(400).json({ message: "Login failed." });
    }

    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) {
      return res.status(400).json({ message: "Login failed. User not found." });
    }

    const token = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        firstname: existingUser.firstname,
        lastname: existingUser.lastname,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      token,
      user: {
        id: existingUser.id,
        firstname: existingUser.firstname,
        lastname: existingUser.lastname,
        email: existingUser.email,
        position: existingUser.position,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export { createUser, authenicateUser };
