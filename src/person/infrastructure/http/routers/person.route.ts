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
import { UpdateActiveUseCase } from "../../../../core/application/use-cases/updateActive.use-case";
import { UpdateDisableUseCase } from "../../../../core/application/use-cases/updateDisable.use-case";
import { UpdateActiveController } from "../../../../core/infrastructure/controllers/updateActive.controller";
import { UpdateDisableController } from "../../../../core/infrastructure/controllers/updateDisable.controller";
import { FindAllPaginatedUseCase } from "../../../../core/application/use-cases/findAllPaginated.use-case";
import { FindAllActivePaginatedUseCase } from "../../../../core/application/use-cases/findAllActivePaginated.use-case";
import { FindAllPaginatedController } from "../../../../core/infrastructure/controllers/findAllPaginated.controller";
import { validateDto } from "../../../../core/infrastructure/middlewares/validateDto.middleware";
import { UpdatePersonUseCase } from "../../../application/uses-cases/updatePerson.use-case";
import { UpdatePersonController } from "../controllers/updatePersons.controller";
import { UpdatePersonRequestDTO } from "../dtos/requests/updatePerson.request.dto";
import { GetAllPersonsByKeywordsUseCase } from "../../../application/uses-cases/getAllPersonsByKeywords.use-case";
import { GetAllPersonsByKeywordsController } from "../controllers/getAllPersonsByKeywords.controller";

const personRouter = Router();

const personTypeormRepo = AppDataSource.getRepository(PersonEntity);

const repository = new PersonRepository(personTypeormRepo);

//USE-CASES
const getByIdUseCase = new FindByIdUseCase(repository, "Persona", PersonMapper.toResponse);
const getAllUseCase = new FindAllUseCase(repository, PersonMapper.toResponse);
const getAllActive = new FindAllActiveUseCase(repository, PersonMapper.toResponse);
const getAllByKeywordsUseCase = new GetAllPersonsByKeywordsUseCase(repository);  
const updateUseCase = new UpdatePersonUseCase(repository);                 
const updateActiveUseCase = new UpdateActiveUseCase(repository, "Persona");
const updateDisableUseCase = new UpdateDisableUseCase(repository, "Persona");

const getAllPaginatedUseCase = new FindAllPaginatedUseCase(repository, PersonMapper.toResponse);
const getAllActivePaginatedUseCase = new FindAllActivePaginatedUseCase(repository, PersonMapper.toResponse);

//CONTROLLERS
const getPersonByIdController = new FindByIdController(getByIdUseCase);
const getAllPersonsController = new FindAllController(getAllUseCase);
const getAllPersonsActiveController = new FindAllActiveController(getAllActive);
const getAllPersonsByKeywordsController = new GetAllPersonsByKeywordsController(getAllByKeywordsUseCase)
const updatePersonController = new UpdatePersonController(updateUseCase);
const updatePersonActiveController = new UpdateActiveController(updateActiveUseCase);
const updatePersonDisableController = new UpdateDisableController(updateDisableUseCase);

const getAllPaginatedController = new FindAllPaginatedController(getAllPaginatedUseCase, 'Personas obtenidas');
const getAllActivePaginatedController = new FindAllPaginatedController(getAllActivePaginatedUseCase, 'Personas activas obtenidas');

//ROUTES
personRouter.get('/', getAllPersonsController.getAll);
personRouter.get('/active', getAllPersonsActiveController.getAllActive);
personRouter.get('/paginated', getAllPaginatedController.getAllPaginated);
personRouter.get('/active/paginated', getAllActivePaginatedController.getAllPaginated);

personRouter.get('/search/:keyword', getAllPersonsByKeywordsController.search); 

personRouter.get('/:id', getPersonByIdController.getById);
personRouter.put('/:id', validateDto(UpdatePersonRequestDTO), updatePersonController.updatePerson);
personRouter.patch('/:id/toggle', updatePersonActiveController.updateActive);
personRouter.patch('/:id/disable', updatePersonDisableController.updateDisable);

export default personRouter;