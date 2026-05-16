import { Router } from 'express';
import { AppDataSource } from '../../../../../../database/typeorm/typeorm.config';
import { ModelEntity } from '../../database/psql/typeorm/entities/model.typeorm.entity';
import { BrandEntity } from '../../../../brand/infrastructure/database/psql/typeorm/entities/brand.typeorm.entity';
import { ModelTypeormRepository } from '../../database/psql/typeorm/repositories/model.typeorm.repository';
import { BrandTypeormRepository } from '../../../../brand/infrastructure/database/psql/typeorm/repositories/brand.typeorm.repository';
import { CreateModelUseCase } from '../../../application/uses-cases/createModel.use-case';
import { GetModelsByBrandUseCase } from '../../../application/uses-cases/getModelsByBrand.use-case';
import { UpdateModelUseCase } from '../../../application/uses-cases/updateModel.use-case';
import { FindAllUseCase } from '../../../../../../core/application/use-cases/findAll.use-case';
import { FindByIdUseCase } from '../../../../../../core/application/use-cases/findById.use-case';
import { UpdateActiveUseCase } from '../../../../../../core/application/use-cases/updateActive.use-case';
import { UpdateDisableUseCase } from '../../../../../../core/application/use-cases/updateDisable.use-case';
import { CreateModelController } from '../controllers/createModel.controller';
import { GetModelsByBrandController } from '../controllers/getModelsByBrand.controller';
import { UpdateModelController } from '../controllers/updateModel.controller';
import { FindAllController } from '../../../../../../core/infrastructure/controllers/findAll.controller';
import { FindByIdController } from '../../../../../../core/infrastructure/controllers/findById.controller';
import { UpdateActiveController } from '../../../../../../core/infrastructure/controllers/updateActive.controller';
import { UpdateDisableController } from '../../../../../../core/infrastructure/controllers/updateDisable.controller';
import { ModelMapper } from '../../../application/mappers/model.mapper';
import { validateDto } from '../../../../../../core/infrastructure/middlewares/validateDto.middleware';
import { CreateModelRequestDto } from '../dtos/requests/createModel.request.dto';
import { UpdateModelRequestDto } from '../dtos/requests/updateModel.request.dto';
import { ValidUUIDRequestDto } from '../../../../../../core/infrastructure/dtos/request/validUUID.request.dto';
import { ValidBrandUUIDRequestDto } from '../dtos/requests/validBrandUUID.request.dto';

const modelRepository = new ModelTypeormRepository(AppDataSource.getRepository(ModelEntity));
const brandRepository = new BrandTypeormRepository(AppDataSource.getRepository(BrandEntity));

const createModelUseCase = new CreateModelUseCase(modelRepository, brandRepository);
const getAllModelsUseCase = new FindAllUseCase(modelRepository, ModelMapper.toResponse);
const getModelByIdUseCase = new FindByIdUseCase(modelRepository, 'Modelo', ModelMapper.toResponse);
const getModelsByBrandUseCase = new GetModelsByBrandUseCase(modelRepository);
const updateModelUseCase = new UpdateModelUseCase(modelRepository);
const toggleModelUseCase = new UpdateActiveUseCase(modelRepository, 'Modelo');
const disableModelUseCase = new UpdateDisableUseCase(modelRepository, 'Modelo');

const createModelController = new CreateModelController(createModelUseCase);
const getAllModelsController = new FindAllController(getAllModelsUseCase);
const getModelByIdController = new FindByIdController(getModelByIdUseCase);
const getModelsByBrandController = new GetModelsByBrandController(getModelsByBrandUseCase);
const updateModelController = new UpdateModelController(updateModelUseCase);
const toggleModelController = new UpdateActiveController(toggleModelUseCase);
const disableModelController = new UpdateDisableController(disableModelUseCase);

const modelRouter = Router();

modelRouter.post('/', validateDto(CreateModelRequestDto), createModelController.create);
modelRouter.get('/', getAllModelsController.getAll);
modelRouter.get(
  '/brand/:idBrand',
  validateDto(ValidBrandUUIDRequestDto, 'params'),
  getModelsByBrandController.getByBrand,
);
modelRouter.get('/:id', validateDto(ValidUUIDRequestDto, 'params'), getModelByIdController.getById);
modelRouter.put(
  '/:id',
  validateDto(ValidUUIDRequestDto, 'params'),
  validateDto(UpdateModelRequestDto),
  updateModelController.update,
);
modelRouter.patch(
  '/:id/toggle',
  validateDto(ValidUUIDRequestDto, 'params'),
  toggleModelController.updateActive,
);
modelRouter.patch(
  '/:id/disable',
  validateDto(ValidUUIDRequestDto, 'params'),
  disableModelController.updateDisable,
);

export default modelRouter;
