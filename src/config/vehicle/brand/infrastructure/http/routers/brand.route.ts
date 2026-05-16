import { Router } from 'express';
import { AppDataSource } from '../../../../../../database/typeorm/typeorm.config';
import { BrandEntity } from '../../database/psql/typeorm/entities/brand.typeorm.entity';
import { BrandTypeormRepository } from '../../database/psql/typeorm/repositories/brand.typeorm.repository';
import { CreateBrandUseCase } from '../../../application/uses-cases/createBrand.use-case';
import { UpdateBrandUseCase } from '../../../application/uses-cases/updateBrand.use-case';
import { FindAllUseCase } from '../../../../../../core/application/use-cases/findAll.use-case';
import { FindByIdUseCase } from '../../../../../../core/application/use-cases/findById.use-case';
import { UpdateActiveUseCase } from '../../../../../../core/application/use-cases/updateActive.use-case';
import { UpdateDisableUseCase } from '../../../../../../core/application/use-cases/updateDisable.use-case';
import { CreateBrandController } from '../controllers/createBrand.controller';
import { UpdateBrandController } from '../controllers/updateBrand.controller';
import { FindAllController } from '../../../../../../core/infrastructure/controllers/findAll.controller';
import { FindByIdController } from '../../../../../../core/infrastructure/controllers/findById.controller';
import { UpdateActiveController } from '../../../../../../core/infrastructure/controllers/updateActive.controller';
import { UpdateDisableController } from '../../../../../../core/infrastructure/controllers/updateDisable.controller';
import { BrandMapper } from '../../../application/mappers/brand.mapper';
import { validateDto } from '../../../../../../core/infrastructure/middlewares/validateDto.middleware';
import { CreateBrandRequestDto } from '../dtos/requests/createBrand.request.dto';
import { UpdateBrandRequestDto } from '../dtos/requests/updateBrand.request.dto';
import { ValidUUIDRequestDto } from '../../../../../../core/infrastructure/dtos/request/validUUID.request.dto';

const brandRepository = new BrandTypeormRepository(AppDataSource.getRepository(BrandEntity));

const createBrandUseCase = new CreateBrandUseCase(brandRepository);
const getAllBrandsUseCase = new FindAllUseCase(brandRepository, BrandMapper.toResponse);
const getBrandByIdUseCase = new FindByIdUseCase(brandRepository, 'Marca', BrandMapper.toResponse);
const updateBrandUseCase = new UpdateBrandUseCase(brandRepository);
const toggleBrandUseCase = new UpdateActiveUseCase(brandRepository, 'Marca');
const disableBrandUseCase = new UpdateDisableUseCase(brandRepository, 'Marca');

const createBrandController = new CreateBrandController(createBrandUseCase);
const getAllBrandsController = new FindAllController(getAllBrandsUseCase);
const getBrandByIdController = new FindByIdController(getBrandByIdUseCase);
const updateBrandController = new UpdateBrandController(updateBrandUseCase);
const toggleBrandController = new UpdateActiveController(toggleBrandUseCase);
const disableBrandController = new UpdateDisableController(disableBrandUseCase);

const brandRouter = Router();

brandRouter.post('/', validateDto(CreateBrandRequestDto), createBrandController.create);
brandRouter.get('/', getAllBrandsController.getAll);
brandRouter.get('/:id', validateDto(ValidUUIDRequestDto, 'params'), getBrandByIdController.getById);
brandRouter.put(
  '/:id',
  validateDto(ValidUUIDRequestDto, 'params'),
  validateDto(UpdateBrandRequestDto),
  updateBrandController.update,
);
brandRouter.patch(
  '/:id/toggle',
  validateDto(ValidUUIDRequestDto, 'params'),
  toggleBrandController.updateActive,
);
brandRouter.patch(
  '/:id/disable',
  validateDto(ValidUUIDRequestDto, 'params'),
  disableBrandController.updateDisable,
);

export default brandRouter;
