import { Router } from "express";
import { StateRepository } from "../../database/repositories/state.repository";
import { AppDataSource } from "../../../../../../database/typeorm/typeorm.config";
import { CreateStateUseCase } from "../../../application/uses-cases/createState.use-case";
import { UpdateStateUseCase } from "../../../application/uses-cases/updateState.use-case";
import { CreateStateController } from "../controllers/createState.controller";
import { UpdateStateController } from "../controllers/updateState.controller";
import { validateDto } from "../../../../../../core/infrastructure/middlewares/validateDto.middleware";
import { CreateStateRequestDTO } from '../dtos/requests/createState.request.dto';
import { UpdateStateRequestDTO } from "../dtos/requests/updateState.request.dto";
import { FindByIdUseCase } from "../../../../../../core/application/use-cases/findById.use-case";
import { FindByIdController } from "../../../../../../core/infrastructure/controllers/findById.controller";
import { StateEntity } from "../../database/psql/typeorm/entities/state.typeorm.entity";
import { StateMapper } from "../../../application/mappers/state.mapper";
import { FindAllUseCase } from "../../../../../../core/application/use-cases/findAll.use-case";
import { FindAllController } from "../../../../../../core/infrastructure/controllers/findAll.controller";
import { FindAllActiveUseCase } from "../../../../../../core/application/use-cases/findAllActive.use-case";
import { FindByNameUseCase } from "../../../../../../core/application/use-cases/findByName.use-case";
import { FindByNameController } from "../../../../../../core/infrastructure/controllers/findByName.controller";
import { FindAllActiveController } from "../../../../../../core/infrastructure/controllers/findAllActive.controller";
import { GetAllStatesByKeywordsUseCase } from "../../../application/uses-cases/getAllStatesByKeywords.use-case";
import { GetAllStatesByKeywordsController } from "../controllers/getAllStatesByKeywords.controller";
import { UpdateActiveUseCase } from "../../../../../../core/application/use-cases/updateActive.use-case";
import { UpdateActiveController } from "../../../../../../core/infrastructure/controllers/updateActive.controller";
import { UpdateDisableUseCase } from "../../../../../../core/application/use-cases/updateDisable.use-case";
import { UpdateDisableController } from "../../../../../../core/infrastructure/controllers/updateDisable.controller";
import { GetStatesByCountryUseCase } from "../../../application/uses-cases/getStatesByCountry.use-case";
import { GetStatesByCountryController } from "../controllers/getStatesByCountry.controller";
import { FindAllActivePaginatedUseCase } from "../../../../../../core/application/use-cases/findAllActivePaginated.use-case";
import { FindAllPaginatedUseCase } from "../../../../../../core/application/use-cases/findAllPaginated.use-case";
import { FindAllPaginatedController } from "../../../../../../core/infrastructure/controllers/findAllPaginated.controller";
import { CountryRepository } from "../../../../country/infrastructure/database/repositories/country.repository";
import { CountryEntity } from "../../../../country/infrastructure/database/psql/typeorm/entities/country.typeorm.entity";

const stateRouter = Router();

const stateTypeormRepo = AppDataSource.getRepository(StateEntity);
const countryTypeormRepo = AppDataSource.getRepository(CountryEntity);


const repository = new StateRepository(stateTypeormRepo);
const repositoryCountry = new CountryRepository(countryTypeormRepo);

//USE-CASES
const createUseCase = new CreateStateUseCase(repository,repositoryCountry);                                               //No Generico
const getByIdUseCase = new FindByIdUseCase(repository, "Estado", StateMapper.toResponse);               //Generico
const getAllUseCase = new FindAllUseCase(repository, StateMapper.toResponse);                           //Generico
const getAllActive = new FindAllActiveUseCase(repository, StateMapper.toResponse);                      //Generico
const getByNameUseCase = new FindByNameUseCase(repository, "Estado", StateMapper.toResponse);           //Generico                            
const getAllByKeywordsUseCase = new GetAllStatesByKeywordsUseCase(repository);                          //No Generico
const getStatesByCountryUseCase = new GetStatesByCountryUseCase(repository);                            //No Generico
const updateUseCase = new UpdateStateUseCase(repository,repositoryCountry);                                               
const updateActiveUseCase = new UpdateActiveUseCase(repository, "Estado");                              //Generico
const updateDisableUseCase = new UpdateDisableUseCase(repository, "Estado");                            //Generico

const getAllPaginatedUseCase = new FindAllPaginatedUseCase(repository, StateMapper.toResponse);
const getAllActivePaginatedUseCase = new FindAllActivePaginatedUseCase(repository, StateMapper.toResponse);

//CONTROLLERS
const createStateController = new CreateStateController(createUseCase);                                         //No Generico
const getStateByIdController = new FindByIdController(getByIdUseCase);                                          //Generico
const getAllStatesController = new FindAllController(getAllUseCase);                                            //Generico
const getAllStatesActiveController = new FindAllActiveController(getAllActive);                                 //Generico
const getStateByNameController = new FindByNameController(getByNameUseCase);                                    //Generico
const getAllStatesByKeywordsController = new GetAllStatesByKeywordsController(getAllByKeywordsUseCase);         //No Generico
const updateStateController = new UpdateStateController(updateUseCase);
const updateActiveController = new UpdateActiveController(updateActiveUseCase);                                 //Generico
const updateDisableController = new UpdateDisableController(updateDisableUseCase);                              //Generico
const getStatesByCountryController = new GetStatesByCountryController(getStatesByCountryUseCase);                //No Generico

const getAllPaginatedController = new FindAllPaginatedController(getAllPaginatedUseCase, 'Estados obtenidos');
const getAllActivePaginatedController = new FindAllPaginatedController(getAllActivePaginatedUseCase, 'Estados activos obtenidos');

//ROUTES
stateRouter.post('/', validateDto(CreateStateRequestDTO), createStateController.create);            //No Generico
stateRouter.get('/', getAllStatesController.getAll);                                                //Generico
stateRouter.get('/active', getAllStatesActiveController.getAllActive);                              //Generico
stateRouter.get('/paginated', getAllPaginatedController.getAllPaginated);
stateRouter.get('/active/paginated', getAllActivePaginatedController.getAllPaginated);

stateRouter.get('/name/:name', getStateByNameController.getByName);                                 //Generico
stateRouter.get('/search/:keyword', getAllStatesByKeywordsController.search);                       //No Generico
stateRouter.get('/country/:country', getStatesByCountryController.getStatesByCountry);              //No Generico

stateRouter.get('/:id', getStateByIdController.getById);                                            //Generico
stateRouter.put('/:id', validateDto(UpdateStateRequestDTO), updateStateController.updateState);
stateRouter.patch('/:id/toggle', updateActiveController.updateActive);
stateRouter.patch('/:id/disable', updateDisableController.updateDisable);                           //Generico

export default stateRouter;