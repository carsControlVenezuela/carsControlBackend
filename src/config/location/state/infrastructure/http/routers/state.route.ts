import { Router } from "express";
import { StateRepository } from "../../database/repositories/state.repository";
import { AppDataSource } from "../../../../../../database/typeorm/typeorm.config";
import { CreateStateUseCase } from "../../../application/uses-cases/createState.use-case";
import { GetStateByIdUseCase } from "../../../application/uses-cases/getStateById.use-case";
import { GetAllStatesUseCase } from "../../../application/uses-cases/getAllStates.use-case";
import { GetAllStatesActiveUseCase } from "../../../application/uses-cases/getAllStatesActive.use-case";
import { GetStateByNameUseCase } from "../../../application/uses-cases/getStateByName.use-case";
import { GetAllStatesByKeywordsUseCase } from "../../../application/uses-cases/getAllStatesByKeywords.use-case";
import { UpdateStateUseCase } from "../../../application/uses-cases/updateState.use-case";
import { UpdateStateActiveUseCase } from "../../../application/uses-cases/updateStateActive.use-case";
import { UpdateStateDisableUseCase } from "../../../application/uses-cases/updateStateDisable.use-case";
import { CreateStateController } from "../controllers/createState.controller";
import { GetStateByIdController } from "../controllers/getStateById.controller";
import { GetAllStatesController } from "../controllers/getAllStates.controller";
import { GetAllStatesActiveController } from "../controllers/getAllStatesActive.controller";
import { GetStateByNameController } from "../controllers/getStateByName.controller";
import { GetAllStatesByKeywordsController } from "../controllers/getAllStatesByKeywords.controller";
import { UpdateStateController } from "../controllers/updateState.controller";
import { UpdateStateActiveController } from "../controllers/updateStateActive.controller";
import { UpdateStateDisableController } from "../controllers/updateStateDisable.controller";
import { validateDto } from "../../../../../../middlewares/validateDto.middleware";
import { CreateStateRequestDTO } from "../dtos/requests/createState.request.dto";
import { UpdateStateRequestDTO } from "../dtos/requests/updateState.request.dto";

const stateRouter = Router();

const repository = new StateRepository(AppDataSource);

//USE-CASES
const createUseCase = new CreateStateUseCase(repository);
const getByIdUseCase = new GetStateByIdUseCase(repository)
const getAllUseCase = new GetAllStatesUseCase(repository);
const getAllActive = new GetAllStatesActiveUseCase(repository);
const getByNameUseCase = new GetStateByNameUseCase(repository);
const getAllStatesByKeywordsUseCase = new GetAllStatesByKeywordsUseCase(repository);
const updateUseCase = new UpdateStateUseCase(repository);
const updateActiveUseCase = new UpdateStateActiveUseCase(repository);
const updateDisableUseCase = new UpdateStateDisableUseCase(repository);



//CONTROLLERS
const createStateController = new CreateStateController(createUseCase);
const getStateByIdController = new GetStateByIdController(getByIdUseCase);
const getAllStatesController = new GetAllStatesController(getAllUseCase);
const getAllStatesActiveController = new GetAllStatesActiveController(getAllActive);
const getStateByNameController = new GetStateByNameController(getByNameUseCase);
const getAllStatesByKeywordsController = new GetAllStatesByKeywordsController(getAllStatesByKeywordsUseCase);
const updateStateController = new UpdateStateController(updateUseCase);
const updateActiveController = new UpdateStateActiveController(updateActiveUseCase);
const updateDisableController = new UpdateStateDisableController(updateDisableUseCase);


//ROUTES
stateRouter.post('/', validateDto(CreateStateRequestDTO), createStateController.create);
stateRouter.get('/', getAllStatesController.getAll);
stateRouter.get('/active', getAllStatesActiveController.getAllStatesActive);

stateRouter.get('/name/:name', getStateByNameController.getStateByName);
stateRouter.get('/search/:keyword', getAllStatesByKeywordsController.search);

stateRouter.get('/:id', getStateByIdController.getStateById);
stateRouter.put('/:id', validateDto(UpdateStateRequestDTO), updateStateController.updateState);
stateRouter.patch('/:id/toggle', updateActiveController.updateStateActive);
stateRouter.patch('/:id/disable', updateDisableController.updateStateDisable);

export default stateRouter;