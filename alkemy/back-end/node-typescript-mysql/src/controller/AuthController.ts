import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Request, Response } from "express";
import config from "../config/config";
import * as jwt from "jsonwebtoken";
import { validate } from "class-validator";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!(username && password)) {
    return res
      .status(400)
      .json({ message: "Username & password are required!" });
  }

  const userRepository = AppDataSource.getRepository(User);
  let user: User;
  try {
    user = await userRepository.findOneOrFail({
      where: { username },
    });
  } catch (e) {
    return res.status(400).json({
      message: "Username or password incorrect",
    });
  }

  //Check password - checkPassword returns bool
  if (!user.checkPassword(password)) {
    return res
      .status(400)
      .json({ message: "Username or Password are incorrect!" });
  }

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    config.jwtSecret,
    { expiresIn: "1h" }
  );
  return res.status(200).json({ message: "OK", token });
};

export const changePass = async (req: Request, res: Response) => {
  const { userId } = res.locals.jwtPayload;
  const { oldPass, newPass } = req.body;

  if (!(oldPass && newPass)) {
    res.status(400).json({ message: "Old and new passwords required." });
  }

  const userRepository = AppDataSource.getRepository(User);
  let user: User;
  try {
    user = await userRepository.findOneOrFail(userId);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong." });
  }

  if (!user.checkPassword(oldPass)) {
    return res.status(400).json({ message: "Check your old password." });
  }

  user.password = oldPass;
  const valdiationOpt = { validationError: { target: false, value: false } };
  const errors = await validate(user, valdiationOpt);
  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  user.hashPassword();
  userRepository.save(user);
  res.json({ message: "Password successfully updated." });
};
