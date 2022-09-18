import {
  getAll,
  getOperationById,
  editOperation,
  deleteOperation,
  createOperation,
} from "../controller/operations";

import { Router } from "express";
import { checkJwt } from "../middlewares/jwt";

const router = Router();

//operation methods
router.get("/", getAll);
router.get("/:id", getOperationById);
router.post("/", createOperation);
router.put("/:id", editOperation);
router.delete("/:id", deleteOperation);

export default router;
