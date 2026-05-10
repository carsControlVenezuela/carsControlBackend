import { Router } from 'express';
import { ModelTypeormRepository } from '../../database/psql/typeorm/repositories/model.typeorm.repository';
import { BrandTypeormRepository } from '../../../../brand/infrastructure/database/psql/typeorm/repositories/brand.typeorm.repository';
import { CreateModelUseCase } from '../../../application/uses-cases/createModel.use-case';
import { GetAllModelsUseCase } from '../../../application/uses-cases/getAllModels.use-case';
import { GetModelByIdUseCase } from '../../../application/uses-cases/getModelById.use-case';
import { GetModelsByBrandUseCase } from '../../../application/uses-cases/getModelsByBrand.use-case';
import { DeleteModelUseCase } from '../../../application/uses-cases/deleteModel.use-case';
import { CreateModelController } from '../controllers/createModel.controller';
import { GetAllModelsController } from '../controllers/getAllModels.controller';
import { GetModelByIdController } from '../controllers/getModelById.controller';
import { GetModelsByBrandController } from '../controllers/getModelsByBrand.controller';
import { DeleteModelController } from '../controllers/deleteModel.controller';
import { validateDto } from '../../../../core/infrastructure/middlewares/validateDto.middleware';
import { CreateModelRequestDto } from '../dtos/requests/createModel.request.dto';

const modelRepository = new ModelTypeormRepository();
const brandRepository = new BrandTypeormRepository();

const createModelUseCase = new CreateModelUseCase(modelRepository, brandRepository);
const getAllModelsUseCase = new GetAllModelsUseCase(modelRepository);
const getModelByIdUseCase = new GetModelByIdUseCase(modelRepository);
const getModelsByBrandUseCase = new GetModelsByBrandUseCase(modelRepository);
const deleteModelUseCase = new DeleteModelUseCase(modelRepository.delete.bind(modelRepository));

const createModelController = new CreateModelController(createModelUseCase, brandRepository);
const getAllModelsController = new GetAllModelsController(getAllModelsUseCase);
const getModelByIdController = new GetModelByIdController(getModelByIdUseCase);
const getModelsByBrandController = new GetModelsByBrandController(getModelsByBrandUseCase);
const deleteModelController = new DeleteModelController(deleteModelUseCase);

const modelRouter = Router();

modelRouter.post('/', validateDto(CreateModelRequestDto), createModelController.create);
modelRouter.get('/', getAllModelsController.getAll);
modelRouter.get('/brand/:idBrand', getModelsByBrandController.getByBrand);
modelRouter.get('/:id', getModelByIdController.getById);
modelRouter.delete('/:id', deleteModelController.delete);

export default modelRouter;
