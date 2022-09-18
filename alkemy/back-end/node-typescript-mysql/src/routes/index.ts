import { Router } from "express";
import auth from "./auth";
import user from "./user";
import operation from "./operation";

const router = Router();

//TODO: IMPLEMENT AUTH
router.use("/auth", auth);
router.use("/users", user);
router.use("/operations", operation);

export default router;
