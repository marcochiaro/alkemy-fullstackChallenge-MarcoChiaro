import { Router } from "express";
import { login } from "../controller/AuthController";
import { checkJwt } from "../middlewares/jwt";

const router = Router();

//login
router.get("/login", login);

//change password
// router.post("/change-password", [checkJwt], changePass);

export default router;
