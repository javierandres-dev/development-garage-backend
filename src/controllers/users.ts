import { Request, Response } from 'express';
import User from '../models/Users';

const bcryptjs = require('bcryptjs');

export const saveNewUser = async (req: Request, res: Response) => {
  try {
    const hashPwd = await bcryptjs.hash(req.body.password, 8);
    const newUser = new User({
      username: req.body.username,
      password: hashPwd,
    });
    const userCreated = await newUser.save();
    if (userCreated) res.status(200).json({ result: userCreated });
    else throw new Error('User not created');
  } catch (err) {
    res.status(err).json(err);
  }
};

export const findAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find();
    if (allUsers) res.status(200).json({ result: allUsers });
    else throw new Error('Users not found');
  } catch (err) {
    res.status(err).json(err);
  }
};

export const findOneUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const userFound = await User.findById(userId);
    if (userFound) res.status(200).json({ result: userFound });
    else throw new Error('User not found');
  } catch (err) {
    res.status(err).json(err);
  }
};

export const updateOneUser = async (req: Request, res: Response) => {
  try {
    const previousUser = await User.findByIdAndUpdate(req.params.id, req.body);
    if (previousUser)
      res.status(200).json({ message: 'Updated user', userId: req.params.id });
    else throw new Error('User not updated');
  } catch (err) {
    res.status(err).json(err);
  }
};

export const deleteOneUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) res.status(200).json({ message: 'User deleted' });
    else throw new Error('User not deleted');
  } catch (err) {
    res.status(err).json(err);
  }
};
