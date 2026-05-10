import { Router } from "express";
import { AppDataSource } from "../../../../database/typeorm/typeorm.config";
import { PermissionEntity } from "../../database/psql/typeorm/entities/permission.typeorm.entity";
import { PermissionRepository } from "../../database/repositories/permission.repository";
import { CreatePermissionUseCase } from "../../../application/uses-cases/createPermission.use-case";
import { FindByIdUseCase } from "../../../../core/application/use-cases/findById.use-case";
import { PermissionMapper } from "../../../application/mappers/permission.mapper";
import { FindAllUseCase } from "../../../../core/application/use-cases/findAll.use-case";
import { FindAllActiveUseCase } from "../../../../core/application/use-cases/findAllActive.use-case";
import { UpdatePermissionUseCase } from "../../../application/uses-cases/updatePermission.use-case";
import { UpdateActiveUseCase } from "../../../../core/application/use-cases/updateActive.use-case";
import { FindByIdController } from "../../../../core/infrastructure/controllers/findById.controller";
import { FindAllController } from "../../../../core/infrastructure/controllers/findAll.controller";
import { FindAllActiveController } from "../../../../core/infrastructure/controllers/findAllActive.controller";
import { UpdatePermissionController } from "../controllers/updatePermission.controller";
import { UpdateActiveController } from "../../../../core/infrastructure/controllers/updateActive.controller";
import { CreatePermissionController } from "../controllers/createPermission.controller";
import { validateDto } from "../../../../core/infrastructure/middlewares/validateDto.middleware";
import { CreatePermissionRequestDTO } from "../dtos/requests/createPermission.request.dto";
import { UpdatePermissionRequestDTO } from "../dtos/requests/updatePermission.request.dto";

const permissionRouter = Router();

const permissionTypeormRepo = AppDataSource.getRepository(PermissionEntity);
const permissionRepository= new PermissionRepository(permissionTypeormRepo);

//USE-CASES
const createUseCase = new CreatePermissionUseCase(permissionRepository);
const getByIdUseCase = new FindByIdUseCase(permissionRepository, 'Permiso', PermissionMapper.toResponse);
const getAllUseCase = new FindAllUseCase(permissionRepository, PermissionMapper.toResponse);
const getAllActive = new FindAllActiveUseCase(permissionRepository, PermissionMapper.toResponse);
const updateUseCase = new UpdatePermissionUseCase(permissionRepository);
const updateActiveUseCase = new UpdateActiveUseCase(permissionRepository, 'Permiso');

//CONTROLLERS
const createController = new CreatePermissionController(createUseCase);
const getByIdController = new FindByIdController(getByIdUseCase);
const getAllController = new FindAllController(getAllUseCase);
const getAllPermissionsActiveController = new FindAllActiveController(getAllActive);
const updateController = new UpdatePermissionController(updateUseCase);
const updateActiveController = new UpdateActiveController(updateActiveUseCase);

//ROUTES
//router.use(authenticate, authorizePermissions('ADMIN')); // todos los endpoints requieren ADMIN

permissionRouter.post('/', validateDto(CreatePermissionRequestDTO), createController.create);
permissionRouter.get('/', getAllController.getAll);
permissionRouter.get('/active', getAllPermissionsActiveController.getAllActive);

permissionRouter.get('/:id', getByIdController.getById);
permissionRouter.put('/:id', validateDto(UpdatePermissionRequestDTO), updateController.update);
permissionRouter.patch('/:id/toggle', updateActiveController.updateActive);
    
export default permissionRouter;