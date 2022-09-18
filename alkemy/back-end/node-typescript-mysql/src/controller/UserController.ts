import { Request, Response } from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { validate } from "class-validator";

export const getAll = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();

    if (users.length > 0) {
      res.status(200).send(users);
    } else {
      res.status(404).json({ message: "No results" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userRepository = AppDataSource.getRepository(User);
  try {
    const user = await userRepository.findOneOrFail({
      where: { id: parseInt(id) },
    });
    res.send(user);
  } catch (error) {
    res.status(404).json({ message: "No results" });
  }
};

export const newUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  //Creating a new instance of User entity as an actual new user,
  //and then setting it's properties with the data destructured from de request body.
  const user = new User();

  user.username = username;
  user.password = password;

  //validation
  const validationOpt = { validationError: { target: false, value: false } };
  const errors = await validate(user, validationOpt);
  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  //TODO: HASH PASSWORD

  //TODO: Modularize the get repository and all the db logic into services, and only leave the trycatch and call the function in here. check operations logic

  const userRepository = AppDataSource.getRepository(User);

  try {
    user.hashPassword();
    await userRepository.save(user);
  } catch (error) {
    return res.status(409).json({ message: "Username already exist." });
  }

  //Everything OK
  res.send("User created");
};

export const editUser = async (req: Request, res: Response) => {
  let user: User;
  const { id } = req.params;
  const { username } = req.body;
  const userRepository = AppDataSource.getRepository(User);

  //Try get user
  try {
    user = await userRepository.findOneOrFail({
      where: { id: parseInt(id) },
    });
    user.username = username;
  } catch (error) {
    return res.status(404).json({ mesagge: "User not found." });
  }

  //validation, second parameter(validationOpt object) is for avoiding show specific data of the returned error array from "valdiate" method.
  const validationOpt = { validationError: { target: false, value: false } };
  const errors = await validate(user, validationOpt);
  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  //Try to save user
  try {
    await userRepository.save(user);
  } catch (error) {
    return res.status(409).json({ message: "Username already in use." });
  }
  res.status(201).json({
    message: "User succesfully updated.",
  });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userRepository = AppDataSource.getRepository(User);
  let user: User;

  try {
    user = await userRepository.findOneOrFail({
      where: { id: parseInt(id) },
    });
  } catch (error) {
    return res.status(404).json({ message: "User not found" });
  }

  //Remove user
  userRepository.delete(id);
  res.status(201).json({ message: "User succesfully deleted" });
};
