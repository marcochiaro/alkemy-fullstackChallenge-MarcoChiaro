import { Router } from "express";
import {
  getUserById,
  deleteUser,
  getAll,
  newUser,
  editUser,
} from "../controller/UserController";
import { checkJwt } from "../middlewares/jwt";

const router = Router();

//Get all users
router.get("/", [checkJwt], getAll);

//Get specific user
router.get("/:id", [checkJwt], getUserById);

//Create new user
router.post("/", newUser);

//Edit user
router.patch("/:id", [checkJwt], editUser);

//Delete user
router.delete("/:id", [checkJwt], deleteUser);

export default router;
