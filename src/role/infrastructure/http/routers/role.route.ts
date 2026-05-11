import { Router } from 'express';
import { RoleMapper } from '../../../application/mappers/role.mapper';
import { AppDataSource } from '../../../../database/typeorm/typeorm.config';
import { RoleEntity } from '../../database/psql/typeorm/entities/role.typeorm.entity';
import { RoleRepository } from '../../database/repositories/role.repository';
import { PermissionEntity } from '../../../../permission/infrastructure/database/psql/typeorm/entities/permission.typeorm.entity';
import { PermissionRepository } from '../../../../permission/infrastructure/database/repositories/permission.repository';
import { CreateRoleUseCase } from '../../../application/uses-cases/createRole.use-case';
import { FindByIdUseCase } from '../../../../core/application/use-cases/findById.use-case';
import { FindAllUseCase } from '../../../../core/application/use-cases/findAll.use-case';
import { FindAllActiveUseCase } from '../../../../core/application/use-cases/findAllActive.use-case';
import { UpdateRoleUseCase } from '../../../application/uses-cases/updateRole.use-case';
import { UpdateActiveUseCase } from '../../../../core/application/use-cases/updateActive.use-case';
import { CreateRoleController } from '../controllers/createRole.controller';
import { FindByIdController } from '../../../../core/infrastructure/controllers/findById.controller';
import { FindAllController } from '../../../../core/infrastructure/controllers/findAll.controller';
import { FindAllActiveController } from '../../../../core/infrastructure/controllers/findAllActive.controller';
import { UpdateRoleController } from '../controllers/updateRole.controller';
import { UpdateActiveController } from '../../../../core/infrastructure/controllers/updateActive.controller';
import { validateDto } from '../../../../core/infrastructure/middlewares/validateDto.middleware';
import { CreateRoleRequestDTO } from '../dtos/requests/createRole.request.dto';
import { UpdateRoleRequestDTO } from '../dtos/requests/updateRole.request.dto';

const roleRouter = Router();

const roleTypeormRepo = AppDataSource.getRepository(RoleEntity);
const roleRepository= new RoleRepository(roleTypeormRepo);

const permissionTypeormRepo = AppDataSource.getRepository(PermissionEntity);
const permissionRepository= new PermissionRepository(permissionTypeormRepo);

//USE-CASES
const createUseCase = new CreateRoleUseCase(roleRepository, permissionRepository);
const getByIdUseCase = new FindByIdUseCase(roleRepository, 'Rol', RoleMapper.toResponse);
const getAllUseCase = new FindAllUseCase(roleRepository, RoleMapper.toResponse);
const getAllActive = new FindAllActiveUseCase(roleRepository, RoleMapper.toResponse);
const updateUseCase = new UpdateRoleUseCase(roleRepository, permissionRepository);
const updateActiveUseCase = new UpdateActiveUseCase(roleRepository, 'Rol');

//CONTROLLERS
const createController = new CreateRoleController(createUseCase);
const getByIdController = new FindByIdController(getByIdUseCase);
const getAllController = new FindAllController(getAllUseCase);
const getAllRolesActiveController = new FindAllActiveController(getAllActive);
const updateController = new UpdateRoleController(updateUseCase);
const updateActiveController = new UpdateActiveController(updateActiveUseCase);

//ROUTES
//router.use(authenticate, authorizeRoles('ADMIN')); // todos los endpoints requieren ADMIN

roleRouter.post('/', validateDto(CreateRoleRequestDTO), createController.create);
roleRouter.get('/', getAllController.getAll);
roleRouter.get('/active', getAllRolesActiveController.getAllActive);

roleRouter.get('/:id', getByIdController.getById);
roleRouter.put('/:id', validateDto(UpdateRoleRequestDTO), updateController.update);
roleRouter.patch('/:id/toggle', updateActiveController.updateActive);

export default roleRouter;