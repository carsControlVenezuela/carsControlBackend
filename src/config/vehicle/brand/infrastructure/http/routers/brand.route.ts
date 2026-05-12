import { Router } from 'express';
import { BrandTypeormRepository } from '../../database/psql/typeorm/repositories/brand.typeorm.repository';
import { CreateBrandUseCase } from '../../../application/uses-cases/createBrand.use-case';
import { GetAllBrandsUseCase } from '../../../application/uses-cases/getAllBrands.use-case';
import { GetBrandByIdUseCase } from '../../../application/uses-cases/getBrandById.use-case';
import { UpdateBrandUseCase } from '../../../application/uses-cases/updateBrand.use-case';
import { DeleteBrandUseCase } from '../../../application/uses-cases/deleteBrand.use-case';
import { CreateBrandController } from '../controllers/createBrand.controller';
import { GetAllBrandsController } from '../controllers/getAllBrands.controller';
import { GetBrandByIdController } from '../controllers/getBrandById.controller';
import { UpdateBrandController } from '../controllers/updateBrand.controller';
import { DeleteBrandController } from '../controllers/deleteBrand.controller';
import { validateDto } from '../../../../../../core/infrastructure/middlewares/validateDto.middleware';
import { CreateBrandRequestDto } from '../dtos/requests/createBrand.request.dto';
import { UpdateBrandRequestDto } from '../dtos/requests/updateBrand.request.dto';
import { ValidUUIDRequestDto } from '../../../../../../core/infrastructure/dtos/request/validUUID.request.dto';

const brandRepository = new BrandTypeormRepository();

const createBrandUseCase = new CreateBrandUseCase(brandRepository);
const getAllBrandsUseCase = new GetAllBrandsUseCase(brandRepository);
const getBrandByIdUseCase = new GetBrandByIdUseCase(brandRepository);
const updateBrandUseCase = new UpdateBrandUseCase(brandRepository);
const deleteBrandUseCase = new DeleteBrandUseCase(brandRepository);

const createBrandController = new CreateBrandController(createBrandUseCase);
const getAllBrandsController = new GetAllBrandsController(getAllBrandsUseCase);
const getBrandByIdController = new GetBrandByIdController(getBrandByIdUseCase);
const updateBrandController = new UpdateBrandController(updateBrandUseCase);
const deleteBrandController = new DeleteBrandController(deleteBrandUseCase);

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
brandRouter.delete(
  '/:id',
  validateDto(ValidUUIDRequestDto, 'params'),
  deleteBrandController.delete,
);

export default brandRouter;
