import { Router } from 'express';
import { BrandTypeormRepository } from '../../database/psql/typeorm/repositories/brand.typeorm.repository';
import { CreateBrandUseCase } from '../../../application/uses-cases/createBrand.use-case';
import { GetAllBrandsUseCase } from '../../../application/uses-cases/getAllBrands.use-case';
import { GetBrandByIdUseCase } from '../../../application/uses-cases/getBrandById.use-case';
import { DeleteBrandUseCase } from '../../../application/uses-cases/deleteBrand.use-case';
import { CreateBrandController } from '../controllers/createBrand.controller';
import { GetAllBrandsController } from '../controllers/getAllBrands.controller';
import { GetBrandByIdController } from '../controllers/getBrandById.controller';
import { DeleteBrandController } from '../controllers/deleteBrand.controller';
import { validateDto } from '../../../../core/infrastructure/middlewares/validateDto.middleware';
import { CreateBrandRequestDto } from '../dtos/requests/createBrand.request.dto';
import { ValidUUIDRequestDto } from '../../../../core/infrastructure/dtos/request/validUUID.request.dto';

const brandRepository = new BrandTypeormRepository();

const createBrandUseCase = new CreateBrandUseCase(brandRepository);
const getAllBrandsUseCase = new GetAllBrandsUseCase(brandRepository);
const getBrandByIdUseCase = new GetBrandByIdUseCase(brandRepository);
const deleteBrandUseCase = new DeleteBrandUseCase(brandRepository.delete.bind(brandRepository));

const createBrandController = new CreateBrandController(createBrandUseCase);
const getAllBrandsController = new GetAllBrandsController(getAllBrandsUseCase);
const getBrandByIdController = new GetBrandByIdController(getBrandByIdUseCase);
const deleteBrandController = new DeleteBrandController(deleteBrandUseCase);

const brandRouter = Router();

brandRouter.post('/', validateDto(CreateBrandRequestDto), createBrandController.create);
brandRouter.get('/', getAllBrandsController.getAll);
brandRouter.get('/:id', validateDto(ValidUUIDRequestDto, 'params'), getBrandByIdController.getById);
brandRouter.delete(
  '/:id',
  validateDto(ValidUUIDRequestDto, 'params'),
  deleteBrandController.delete,
);

export default brandRouter;
