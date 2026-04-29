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
import { GetAllMunicipalitiesByKeywordsUseCase } from "../../../application/uses-cases/getAllMunicipalitiesByKeywords.use-case";
import { UpdateActiveUseCase } from "../../../../../../core/application/use-cases/updateActive.use-case";
import { UpdateActiveController } from "../../../../../../core/infrastructure/controllers/updateActive.controller";
import { UpdateDisableUseCase } from "../../../../../../core/application/use-cases/updateDisable.use-case";
import { UpdateDisableController } from "../../../../../../core/infrastructure/controllers/updateDisable.controller";
import { MunicipalityRepository } from "../../database/repositories/municipality.repository";
import { MunicipalityEntity } from "../../database/psql/typeorm/entities/municipality.typeorm.entity";
import { CreateMunicipalityUseCase } from "../../../application/uses-cases/createMunicipality.use-case";
import { MunicipalityMapper } from "../../../application/mappers/state.mapper";
import { UpdateMunicipalityUseCase } from "../../../application/uses-cases/updateMunicipality.use-case";
import { CreateMunicipalityController } from "../controllers/createMunicipality.controller";
import { GetAllMunicipalitiesByKeywordsController } from "../controllers/getAllMunicipalitesByKeywords.controller";
import { UpdateMunicipalityController } from "../controllers/updateMunicipality.controller";
import { CreateMunicipalityRequestDTO } from "../dtos/requests/createMunicipality.request.dto";
import { UpdateMunicipalityRequestDTO } from "../dtos/requests/updateMunicipality.request.dto";

const MunicipalityRouter = Router();

const MunicipalityTypeormRepo = AppDataSource.getRepository(MunicipalityEntity);

const repository = new MunicipalityRepository(MunicipalityTypeormRepo);

//USE-CASES
const createUseCase = new CreateMunicipalityUseCase(repository);                                               //No Generico
const getByIdUseCase = new FindByIdUseCase(repository, "Municipio", MunicipalityMapper.toResponse);               //Generico
const getAllUseCase = new FindAllUseCase(repository, MunicipalityMapper.toResponse);                           //Generico
const getAllActive = new FindAllActiveUseCase(repository, MunicipalityMapper.toResponse);                      //Generico
const getByNameUseCase = new FindByNameUseCase(repository, "Municipio", MunicipalityMapper.toResponse);           //Generico                            
const getAllByKeywordsUseCase = new GetAllMunicipalitiesByKeywordsUseCase(repository);                          //No Generico
const updateUseCase = new UpdateMunicipalityUseCase(repository);                                               
const updateActiveUseCase = new UpdateActiveUseCase(repository, "Municipio");                              //Generico
const updateDisableUseCase = new UpdateDisableUseCase(repository, "Municipio");                            //Generico

//CONTROLLERS
const createMunicipalityController = new CreateMunicipalityController(createUseCase);                                         //No Generico
const getMunicipalityByIdController = new FindByIdController(getByIdUseCase);                                          //Generico
const getAllMunicipalitiesController = new FindAllController(getAllUseCase);                                            //Generico
const getAllMunicipalitiesActiveController = new FindAllActiveController(getAllActive);                                 //Generico
const getMunicipalityByNameController = new FindByNameController(getByNameUseCase);                                    //Generico
const getAllMunicipalitiesByKeywordsController = new GetAllMunicipalitiesByKeywordsController(getAllByKeywordsUseCase);         //No Generico
const updateMunicipalityController = new UpdateMunicipalityController(updateUseCase);
const updateActiveController = new UpdateActiveController(updateActiveUseCase);                                 //Generico
const updateDisableController = new UpdateDisableController(updateDisableUseCase);                              //Generico


//ROUTES
MunicipalityRouter.post('/', validateDto(CreateMunicipalityRequestDTO), createMunicipalityController.create);            //No Generico
MunicipalityRouter.get('/', getAllMunicipalitiesController.getAll);                                                //Generico
MunicipalityRouter.get('/active', getAllMunicipalitiesActiveController.getAllActive);                              //Generico

MunicipalityRouter.get('/name/:name', getMunicipalityByNameController.getByName);                            //Generico
MunicipalityRouter.get('/search/:keyword', getAllMunicipalitiesByKeywordsController.search);                       //No Generico

MunicipalityRouter.get('/:id', getMunicipalityByIdController.getById);                                            //Generico
MunicipalityRouter.put('/:id', validateDto(UpdateMunicipalityRequestDTO), updateMunicipalityController.updateMunicipality);
MunicipalityRouter.patch('/:id/toggle', updateActiveController.updateActive);
MunicipalityRouter.patch('/:id/disable', updateDisableController.updateDisable);                           //Generico

export default MunicipalityRouter;