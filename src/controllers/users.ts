import { server } from "../server";
import { Request, Response } from "express";
import User from "../models/Users";

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

export const saveNewUser = async (req: Request, res: Response) => {
  try {
    if (await User.findOne({ username: req.body.username }))
      res
        .status(400)
        .json({ message: "User already exists with this email, log in" });
    else {
      const hashPwd = await bcryptjs.hash(req.body.password, 8);
      const newUser = new User({
        username: req.body.username,
        password: hashPwd,
      });
      const userCreated = await newUser.save();
      if (userCreated) res.status(200).json({ result: userCreated });
      else res.status(400).json({ message: "User not created" });
    }
  } catch (err) {
    res.status(err).json(err);
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      if (await bcryptjs.compare(req.body.password, user.password)) {
        const payload = {
          check: true,
        };
        const token = jwt.sign(payload, server.get("key"), {
          expiresIn: "86400000",
        });
        res.status(200).json({ result: token });
      } else {
        res.status(400).json({ message: "Incorrect username and/or password" });
      }
    } else {
      res.status(400).json({ message: "Incorrect username and/or password" });
    }
  } catch (err) {
    res.status(err).json(err);
  }
};

export const findAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find();
    if (allUsers) res.status(200).json({ result: allUsers });
    else res.status(400).json({ message: "No users found" });
  } catch (err) {
    res.status(err).json(err);
  }
};

export const findOneUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const userFound = await User.findById(userId);
    if (userFound) res.status(200).json({ result: userFound });
    else res.status(400).json({ message: "User not found" });
  } catch (err) {
    res.status(err).json(err);
  }
};

export const updateOneUser = async (req: Request, res: Response) => {
  try {
    const previousUser = await User.findByIdAndUpdate(req.params.id, req.body);
    if (previousUser)
      res.status(200).json({ message: "Updated user", userId: req.params.id });
    else res.status(400).json({ message: "User not found, no updated user" });
  } catch (err) {
    res.status(err).json(err);
  }
};

export const deleteOneUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) res.status(200).json({ message: "User deleted" });
    else res.status(400).json({ message: "User not found, user not deleted" });
  } catch (err) {
    res.status(err).json(err);
  }
};
