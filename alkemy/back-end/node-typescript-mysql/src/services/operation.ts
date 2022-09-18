import { validate } from "class-validator";
import { AppDataSource } from "../data-source";
import { Operation, OperationType } from "../entity/Operation";

export type OpType = {
  concept: string;
  amount: number;
  type: OperationType;
};

export const findOneOrFail = async (id: number) => {
  const operationRepository = AppDataSource.getRepository(Operation);
  return await operationRepository.findOneOrFail({
    where: { id },
  });
};

export const findAll = async (userId: number) => {
  const operationRepository = AppDataSource.getRepository(Operation);
  return await operationRepository.find();
};

export const create = async (operation: OpType) => {
  const { concept, amount, type } = operation;

  const newOperation = new Operation();

  newOperation.concept = concept;
  newOperation.amount = amount;
  newOperation.type = type;

  //validation
  const errors = await validate(operation, {
    validationError: { target: false, value: false },
  });
  if (errors.length > 0) {
    throw new Error("Invalid arguments.");
  }

  const operationRepository = AppDataSource.getRepository(Operation);

  return await operationRepository.save(operation);
};

export const edit = async (id: number, operation: OpType) => {
  let newOperation: OpType;
  const { concept, amount, type } = operation;
  const operationRepository = AppDataSource.getRepository(Operation);

  //Try get user
  try {
    newOperation = await operationRepository.findOneOrFail({
      where: { id },
    });
    newOperation.concept = concept;
    newOperation.amount = amount;
    newOperation.type = type;
  } catch (error) {
    throw new Error("Operation not found.");
  }

  //validation, second parameter(validationOpt object) is for avoiding show specific data of the returned error array from "valdiate" method.
  const validationOptions = {
    validationError: { target: false, value: false },
  };
  const errors = await validate(newOperation, validationOptions);
  if (errors.length > 0) {
    throw new Error("Operation invalid.");
  }

  return await operationRepository.save(newOperation);
};

export const deleteById = async (id: number) => {
  const operationRepository = AppDataSource.getRepository(Operation);

  //Remove user
  return await operationRepository
    .createQueryBuilder()
    .delete()
    .from(Operation)
    .where("id = :id", { id })
    .execute();
};
