import { Request, Response } from "express";
import {
  findAll,
  findOneOrFail,
  create,
  edit,
  deleteById,
} from "../services/operation";

//TODO: PAGINATION
export const getAll = async (req: Request, res: Response) => {
  try {
    const operations = await findAll(req.body.userId);
    return res.status(200).send({ data: operations });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getOperationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const operation = await findOneOrFail(parseInt(id));
    return res.status(200).json({ data: operation });
  } catch (error) {
    return res.status(404).json({ message: "No results" });
  }
};

export const createOperation = async (req: Request, res: Response) => {
  try {
    const newOperation = await create(req.body);
    return res.status(200).json({
      message: "Operation successfully created",
      data: newOperation,
    });
  } catch (error) {
    return res.status(409).json({ message: "An error has occurred" });
  }
};

export const editOperation = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const operation = await edit(parseInt(id), req.body);
    return res.status(201).json({
      message: "Operation succesfully updated.",
      data: operation,
    });
  } catch (error) {
    return res.status(409).json({ message: "Operation already exist." });
  }
};

export const deleteOperation = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteById(parseInt(id));
    return res.status(201).json({ message: "Operation succesfully deleted" });
  } catch (error) {
    return res.status(404).json({ message: "Operation not found" });
  }
};
