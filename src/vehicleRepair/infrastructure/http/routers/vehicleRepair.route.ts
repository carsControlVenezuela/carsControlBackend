import { Router } from "express";
import { AppDataSource } from "../../../../database/typeorm/typeorm.config";
import { VehicleRepairEntity } from "../../database/psql/typeorm/entities/vehicleRepair.typeorm.entity";
import { VehicleRepairTypeormRepository } from "../../database/repositories/vehicleRepair.repository";
import { CreateVehicleRepairUseCase } from "../../../application/uses-cases/createVehicleRepair.use-case";
import { FindByIdUseCase } from "../../../../core/application/use-cases/findById.use-case";
import { VehicleRepairMapper } from "../../../application/mappers/vehicleRepair.mapper";
import { FindAllUseCase } from "../../../../core/application/use-cases/findAll.use-case";
import { FindAllActiveUseCase } from "../../../../core/application/use-cases/findAllActive.use-case";
import { FindByNameUseCase } from "../../../../core/application/use-cases/findByName.use-case";
import { UpdateVehicleRepairUseCase } from "../../../application/uses-cases/updateVehicleRepair.use-case";
import { UpdateActiveUseCase } from "../../../../core/application/use-cases/updateActive.use-case";
import { UpdateDisableUseCase } from "../../../../core/application/use-cases/updateDisable.use-case";
import { FindAllPaginatedUseCase } from "../../../../core/application/use-cases/findAllPaginated.use-case";
import { FindAllActivePaginatedUseCase } from "../../../../core/application/use-cases/findAllActivePaginated.use-case";
import { CreateVehicleRepairController } from "../controllers/createVehicleRepair.controller";
import { FindByIdController } from "../../../../core/infrastructure/controllers/findById.controller";
import { FindAllController } from "../../../../core/infrastructure/controllers/findAll.controller";
import { FindAllActiveController } from "../../../../core/infrastructure/controllers/findAllActive.controller";
import { FindByNameController } from "../../../../core/infrastructure/controllers/findByName.controller";
import { UpdateVehicleRepairController } from "../controllers/updateVehicleRepair.controller";
import { UpdateActiveController } from "../../../../core/infrastructure/controllers/updateActive.controller";
import { UpdateDisableController } from "../../../../core/infrastructure/controllers/updateDisable.controller";
import { FindAllPaginatedController } from "../../../../core/infrastructure/controllers/findAllPaginated.controller";
import { validateDto } from "../../../../core/infrastructure/middlewares/validateDto.middleware";
import { CreateVehicleRepairRequestDTO } from "../dtos/requests/createVehicleRepair.request.http.dto";
import { UpdateVehicleRepairRequestDTO } from "../dtos/requests/updateVehicleRepair.request.http.dto";
import { GetAllVehiclesRepairByKeywordsUseCase } from "../../../application/uses-cases/getAllVehiclesRepairByKeywords.use-case";
import { GetAllVehiclesRepairByKeywordsController } from "../controllers/getAllVehiclesRepairByKeywords.controller";

const vehicleRepairRouter = Router();

const vehicleRepairTypeormRepo = AppDataSource.getRepository(VehicleRepairEntity);

const repository = new VehicleRepairTypeormRepository(vehicleRepairTypeormRepo);

//USE-CASES
const createUseCase = new CreateVehicleRepairUseCase(repository);
const getByIdUseCase = new FindByIdUseCase(repository, "Taller Mecánico", VehicleRepairMapper.toResponse);
const getAllUseCase = new FindAllUseCase(repository, VehicleRepairMapper.toResponse);
const getAllActive = new FindAllActiveUseCase(repository, VehicleRepairMapper.toResponse);
const getByNameUseCase = new FindByNameUseCase(repository, "Taller Mecánico", VehicleRepairMapper.toResponse);                           
const getAllByKeywordsUseCase = new GetAllVehiclesRepairByKeywordsUseCase(repository);
const updateUseCase = new UpdateVehicleRepairUseCase(repository);                                               
const updateActiveUseCase = new UpdateActiveUseCase(repository, "Taller Mecánico");
const updateDisableUseCase = new UpdateDisableUseCase(repository, "Taller Mecánico");

const getAllPaginatedUseCase = new FindAllPaginatedUseCase(repository, VehicleRepairMapper.toResponse);
const getAllActivePaginatedUseCase = new FindAllActivePaginatedUseCase(repository, VehicleRepairMapper.toResponse);

//CONTROLLERS
const createVehicleRepairController = new CreateVehicleRepairController(createUseCase);
const getVehicleRepairByIdController = new FindByIdController(getByIdUseCase);
const getAllVehicleRepairsController = new FindAllController(getAllUseCase);
const getAllVehicleRepairsActiveController = new FindAllActiveController(getAllActive);
const getVehicleRepairByNameController = new FindByNameController(getByNameUseCase);
const getAllVehiclesRepairByKeywordsController = new GetAllVehiclesRepairByKeywordsController(getAllByKeywordsUseCase);
const updateVehicleRepairController = new UpdateVehicleRepairController(updateUseCase);
const updateActiveController = new UpdateActiveController(updateActiveUseCase);
const updateDisableController = new UpdateDisableController(updateDisableUseCase);
const getAllPaginatedController = new FindAllPaginatedController(getAllPaginatedUseCase, 'Taller Mecánicos obtenidos');
const getAllActivePaginatedController = new FindAllPaginatedController(getAllActivePaginatedUseCase, 'Taller Mecánicos activos obtenidos');

//ROUTES
vehicleRepairRouter.post('/', validateDto(CreateVehicleRepairRequestDTO), createVehicleRepairController.create);
vehicleRepairRouter.get('/', getAllVehicleRepairsController.getAll);
vehicleRepairRouter.get('/active', getAllVehicleRepairsActiveController.getAllActive);
vehicleRepairRouter.get('/paginated', getAllPaginatedController.getAllPaginated);
vehicleRepairRouter.get('/active/paginated', getAllActivePaginatedController.getAllPaginated);
vehicleRepairRouter.get('/name/:name', getVehicleRepairByNameController.getByName);
vehicleRepairRouter.get('/search/:keyword', getAllVehiclesRepairByKeywordsController.search);
vehicleRepairRouter.get('/:id', getVehicleRepairByIdController.getById);
vehicleRepairRouter.put('/:id', validateDto(UpdateVehicleRepairRequestDTO), updateVehicleRepairController.updateVehicleRepair);
vehicleRepairRouter.patch('/:id/toggle', updateActiveController.updateActive);
vehicleRepairRouter.patch('/:id/disable', updateDisableController.updateDisable);

export default vehicleRepairRouter;