import { Router } from 'express';
import { ModelTypeormRepository } from '../../database/psql/typeorm/repositories/model.typeorm.repository';
import { BrandTypeormRepository } from '../../../../brand/infrastructure/database/psql/typeorm/repositories/brand.typeorm.repository';
import { CreateModelUseCase } from '../../../application/uses-cases/createModel.use-case';
import { GetAllModelsUseCase } from '../../../application/uses-cases/getAllModels.use-case';
import { GetModelByIdUseCase } from '../../../application/uses-cases/getModelById.use-case';
import { GetModelsByBrandUseCase } from '../../../application/uses-cases/getModelsByBrand.use-case';
import { UpdateModelUseCase } from '../../../application/uses-cases/updateModel.use-case';
import { DeleteModelUseCase } from '../../../application/uses-cases/deleteModel.use-case';
import { CreateModelController } from '../controllers/createModel.controller';
import { GetAllModelsController } from '../controllers/getAllModels.controller';
import { GetModelByIdController } from '../controllers/getModelById.controller';
import { GetModelsByBrandController } from '../controllers/getModelsByBrand.controller';
import { UpdateModelController } from '../controllers/updateModel.controller';
import { DeleteModelController } from '../controllers/deleteModel.controller';
import { validateDto } from '../../../../../../core/infrastructure/middlewares/validateDto.middleware';
import { CreateModelRequestDto } from '../dtos/requests/createModel.request.dto';
import { UpdateModelRequestDto } from '../dtos/requests/updateModel.request.dto';
import { ValidUUIDRequestDto } from '../../../../../../core/infrastructure/dtos/request/validUUID.request.dto';
import { ValidBrandUUIDRequestDto } from '../dtos/requests/validBrandUUID.request.dto';

const modelRepository = new ModelTypeormRepository();
const brandRepository = new BrandTypeormRepository();

const createModelUseCase = new CreateModelUseCase(modelRepository, brandRepository);
const getAllModelsUseCase = new GetAllModelsUseCase(modelRepository);
const getModelByIdUseCase = new GetModelByIdUseCase(modelRepository);
const getModelsByBrandUseCase = new GetModelsByBrandUseCase(modelRepository);
const updateModelUseCase = new UpdateModelUseCase(modelRepository);
const deleteModelUseCase = new DeleteModelUseCase(modelRepository.delete.bind(modelRepository));

const createModelController = new CreateModelController(createModelUseCase);
const getAllModelsController = new GetAllModelsController(getAllModelsUseCase);
const getModelByIdController = new GetModelByIdController(getModelByIdUseCase);
const getModelsByBrandController = new GetModelsByBrandController(getModelsByBrandUseCase);
const updateModelController = new UpdateModelController(updateModelUseCase);
const deleteModelController = new DeleteModelController(deleteModelUseCase);

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
modelRouter.delete(
  '/:id',
  validateDto(ValidUUIDRequestDto, 'params'),
  deleteModelController.delete,
);

export default modelRouter;
