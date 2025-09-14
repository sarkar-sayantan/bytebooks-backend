export const getUserByEmail = async (req, res, next) => {
  try {
    const user = await userService.getUserByEmail(req.params.email);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

import * as userService from "../services/user.service.js";

export const addUser = async (req, res, next) => {
  try {
    const user = await userService.addUser(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};
