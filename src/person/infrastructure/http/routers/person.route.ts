import { Router } from "express";
import { AppDataSource } from "../../../../database/typeorm/typeorm.config";
import { PersonEntity } from "../../database/psql/typeorm/entities/person.typeorm.entity";
import { PersonRepository } from "../../database/repositories/person.repository";
import { FindByIdUseCase } from "../../../../core/application/use-cases/findById.use-case";
import { FindAllUseCase } from "../../../../core/application/use-cases/findAll.use-case";
import { FindAllActiveUseCase } from "../../../../core/application/use-cases/findAllActive.use-case";
import { PersonMapper } from "../../../application/mappers/person.mapper";
import { FindByIdController } from "../../../../core/infrastructure/controllers/findById.controller";
import { FindAllController } from "../../../../core/infrastructure/controllers/findAll.controller";
import { FindAllActiveController } from "../../../../core/infrastructure/controllers/findAllActive.controller";
import { authenticate } from "../../../../auth/infrastructure/middlewares/authenticate.middleware";

const personRouter = Router();

const personTypeormRepo = AppDataSource.getRepository(PersonEntity);

const repository = new PersonRepository(personTypeormRepo);

//USE-CASES
const getByIdUseCase = new FindByIdUseCase(repository, "Persona", PersonMapper.toResponse);
const getAllUseCase = new FindAllUseCase(repository, PersonMapper.toResponse);
const getAllActive = new FindAllActiveUseCase(repository, PersonMapper.toResponse);                

//CONTROLLERS
const getPersonByIdController = new FindByIdController(getByIdUseCase);
const getAllPersonsController = new FindAllController(getAllUseCase);
const getAllPersonsActiveController = new FindAllActiveController(getAllActive);

//ROUTES
personRouter.get('/', authenticate, getAllPersonsController.getAll);
personRouter.get('/active', authenticate, getAllPersonsActiveController.getAllActive);

personRouter.get('/:id', authenticate, getPersonByIdController.getById);

export default personRouter;