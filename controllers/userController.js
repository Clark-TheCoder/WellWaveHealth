import dotenv from "dotenv";
import {
  createNewUser,
  findUserByEmail,
  updateUser,
} from "../models/userModel.js";
import bcrypt from "bcrypt";
dotenv.config();
import jwt from "jsonwebtoken";
import { response } from "express";

const createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, position, password } = req.body;

    //check to see if form is completed
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
        id: Number(newUser.id),
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
      return res
        .status(400)
        .json({ message: "Login failure. Please try again." });
    }

    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) {
      return res
        .status(400)
        .json({ message: "Login failure. Please try again." });
    }

    const token = jwt.sign(
      {
        id: Number(existingUser.id),
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

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    //get the filled out fields from the form
    const userFields = {};
    if (req.body.firstname) userFields.firstname = req.body.firstname;
    if (req.body.lastname) userFields.lastname = req.body.lastname;
    if (req.body.email) userFields.email = req.body.email;
    if (req.body.position) userFields.position = req.body.position;
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      userFields.password = hashedPassword;
    }

    //call db function
    const updatedUser = await updateUser(userFields, userId);
    if (updatedUser.affectedRows === 0) {
      return res.status(400).json({
        message: "No changes made. Please sign back in and try again.",
      });
    } else {
      res.status(200).json({
        message: "Updated successfully",
        user: updatedUser,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Failed to update user profile." });
  }
};

export { createUser, authenicateUser, updateUserProfile };
