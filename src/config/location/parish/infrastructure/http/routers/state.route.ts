import { Router } from "express";
import { AppDataSource } from "../../../../../../database/typeorm/typeorm.config";
import { validateDto } from "../../../../../../core/infrastructure/middlewares/validateDto.middleware";
import { FindByIdUseCase } from "../../../../../../core/application/use-cases/findById.use-case";
import { FindByIdController } from "../../../../../../core/infrastructure/controllers/findById.controller";
import { FindAllUseCase } from "../../../../../../core/application/use-cases/findAll.use-case";
import { FindAllController } from "../../../../../../core/infrastructure/controllers/findAll.controller";
import { FindAllActiveUseCase } from "../../../../../../core/application/use-cases/findAllActive.use-case";
import { FindByNameUseCase } from "../../../../../../core/application/use-cases/findByName.use-case";
import { FindByNameController } from "../../../../../../core/infrastructure/controllers/findByName.controller";
import { FindAllActiveController } from "../../../../../../core/infrastructure/controllers/findAllActive.controller";
import { UpdateActiveUseCase } from "../../../../../../core/application/use-cases/updateActive.use-case";
import { UpdateActiveController } from "../../../../../../core/infrastructure/controllers/updateActive.controller";
import { UpdateDisableUseCase } from "../../../../../../core/application/use-cases/updateDisable.use-case";
import { UpdateDisableController } from "../../../../../../core/infrastructure/controllers/updateDisable.controller";
import { ParishEntity } from "../../database/psql/typeorm/entities/parish.typeorm.entity";
import { ParishRepository } from "../../database/repositories/parish.repository";
import { CreateParishUseCase } from "../../../application/uses-cases/createParish.use-case";
import { ParishMapper } from "../../../application/mappers/parish.mapper";
import { UpdateParishUseCase } from "../../../application/uses-cases/updateParish.use-case";
import { GetAllParishesByKeywordsUseCase } from "../../../application/uses-cases/getAllParishesByKeywords.use-case";
import { CreateParishController } from "../controllers/createParish.controller";
import { GetAllParishesByKeywordsController } from "../controllers/getAllParishesByKeywords.controller";
import { UpdateParishController } from "../controllers/updateParish.controller";
import { CreateParishRequestDTO } from "../dtos/requests/createParish.request.dto";
import { UpdateParishRequestDTO } from "../dtos/requests/updateParish.request.dto";

const ParishRouter = Router();

const ParishTypeormRepo = AppDataSource.getRepository(ParishEntity);

const repository = new ParishRepository(ParishTypeormRepo);

//USE-CASES
const createUseCase = new CreateParishUseCase(repository);                                               //No Generico
const getByIdUseCase = new FindByIdUseCase(repository, "Parroquia", ParishMapper.toResponse);               //Generico
const getAllUseCase = new FindAllUseCase(repository, ParishMapper.toResponse);                           //Generico
const getAllActive = new FindAllActiveUseCase(repository, ParishMapper.toResponse);                      //Generico
const getByNameUseCase = new FindByNameUseCase(repository, "Parroquia", ParishMapper.toResponse);           //Generico                            
const getAllByKeywordsUseCase = new GetAllParishesByKeywordsUseCase(repository);                          //No Generico
const updateUseCase = new UpdateParishUseCase(repository);                                               
const updateActiveUseCase = new UpdateActiveUseCase(repository, "Parroquia");                              //Generico
const updateDisableUseCase = new UpdateDisableUseCase(repository, "Parroquia");                            //Generico

//CONTROLLERS
const createParishController = new CreateParishController(createUseCase);                                         //No Generico
const getParishByIdController = new FindByIdController(getByIdUseCase);                                          //Generico
const getAllParishesController = new FindAllController(getAllUseCase);                                            //Generico
const getAllParishesActiveController = new FindAllActiveController(getAllActive);                                 //Generico
const getParishByNameController = new FindByNameController(getByNameUseCase);                                    //Generico
const getAllParishesByKeywordsController = new GetAllParishesByKeywordsController(getAllByKeywordsUseCase);         //No Generico
const updateParishController = new UpdateParishController(updateUseCase);
const updateActiveController = new UpdateActiveController(updateActiveUseCase);                                 //Generico
const updateDisableController = new UpdateDisableController(updateDisableUseCase);                              //Generico


//ROUTES
ParishRouter.post('/', validateDto(CreateParishRequestDTO), createParishController.create);            //No Generico
ParishRouter.get('/', getAllParishesController.getAll);                                                //Generico
ParishRouter.get('/active', getAllParishesActiveController.getAllActive);                              //Generico

ParishRouter.get('/name/:name', getParishByNameController.getByName);                            //Generico
ParishRouter.get('/search/:keyword', getAllParishesByKeywordsController.search);                       //No Generico

ParishRouter.get('/:id', getParishByIdController.getById);                                            //Generico
ParishRouter.put('/:id', validateDto(UpdateParishRequestDTO), updateParishController.updateParish);
ParishRouter.patch('/:id/toggle', updateActiveController.updateActive);
ParishRouter.patch('/:id/disable', updateDisableController.updateDisable);                           //Generico

export default ParishRouter;