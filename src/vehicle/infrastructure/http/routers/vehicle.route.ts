import { Router } from 'express';
import { AppDataSource } from '../../../../database/typeorm/typeorm.config';
import { VehicleEntity } from '../../database/psql/typeorm/entities/vehicle.typeorm.entity';
import { ModelEntity } from '../../../../config/vehicle/model/infrastructure/database/psql/typeorm/entities/model.typeorm.entity';
import { VehicleTypeormRepository } from '../../database/psql/typeorm/repositories/vehicle.typeorm.repository';
import { ModelTypeormRepository } from '../../../../config/vehicle/model/infrastructure/database/psql/typeorm/repositories/model.typeorm.repository';
import { CreateVehicleUseCase } from '../../../application/uses-cases/createVehicle.use-case';
import { GetVehiclesByPersonUseCase } from '../../../application/uses-cases/getVehiclesByPerson.use-case';
import { UpdateVehicleUseCase } from '../../../application/uses-cases/updateVehicle.use-case';
import { FindByIdUseCase } from '../../../../core/application/use-cases/findById.use-case';
import { UpdateActiveUseCase } from '../../../../core/application/use-cases/updateActive.use-case';
import { UpdateDisableUseCase } from '../../../../core/application/use-cases/updateDisable.use-case';
import { CreateVehicleController } from '../controllers/createVehicle.controller';
import { GetVehiclesByPersonController } from '../controllers/getVehiclesByPerson.controller';
import { UpdateVehicleController } from '../controllers/updateVehicle.controller';
import { FindByIdController } from '../../../../core/infrastructure/controllers/findById.controller';
import { UpdateActiveController } from '../../../../core/infrastructure/controllers/updateActive.controller';
import { UpdateDisableController } from '../../../../core/infrastructure/controllers/updateDisable.controller';
import { VehicleMapper } from '../../../application/mappers/vehicle.mapper';
import { validateDto } from '../../../../core/infrastructure/middlewares/validateDto.middleware';
import { CreateVehicleRequestDto } from '../dtos/requests/createVehicle.request.dto';
import { UpdateVehicleRequestDto } from '../dtos/requests/updateVehicle.request.dto';
import { ValidUUIDRequestDto } from '../../../../core/infrastructure/dtos/request/validUUID.request.dto';
import { ValidPersonUUIDRequestDto } from '../dtos/requests/validPersonUUID.request.dto';

const vehicleRepository = new VehicleTypeormRepository(AppDataSource.getRepository(VehicleEntity));
const modelRepository = new ModelTypeormRepository(AppDataSource.getRepository(ModelEntity));

const createVehicleUseCase = new CreateVehicleUseCase(vehicleRepository, modelRepository);
const getVehicleByIdUseCase = new FindByIdUseCase(vehicleRepository, 'Vehículo', VehicleMapper.toResponse);
const getVehiclesByPersonUseCase = new GetVehiclesByPersonUseCase(vehicleRepository);
const updateVehicleUseCase = new UpdateVehicleUseCase(vehicleRepository);
const toggleVehicleUseCase = new UpdateActiveUseCase(vehicleRepository, 'Vehículo');
const disableVehicleUseCase = new UpdateDisableUseCase(vehicleRepository, 'Vehículo');

const createVehicleController = new CreateVehicleController(createVehicleUseCase);
const getVehicleByIdController = new FindByIdController(getVehicleByIdUseCase);
const getVehiclesByPersonController = new GetVehiclesByPersonController(getVehiclesByPersonUseCase);
const updateVehicleController = new UpdateVehicleController(updateVehicleUseCase);
const toggleVehicleController = new UpdateActiveController(toggleVehicleUseCase);
const disableVehicleController = new UpdateDisableController(disableVehicleUseCase);

const vehicleRouter = Router();

vehicleRouter.post('/', validateDto(CreateVehicleRequestDto), createVehicleController.create);
vehicleRouter.get(
  '/person/:idPerson',
  validateDto(ValidPersonUUIDRequestDto, 'params'),
  getVehiclesByPersonController.getByPerson,
);
vehicleRouter.get(
  '/:id',
  validateDto(ValidUUIDRequestDto, 'params'),
  getVehicleByIdController.getById,
);
vehicleRouter.put(
  '/:id',
  validateDto(ValidUUIDRequestDto, 'params'),
  validateDto(UpdateVehicleRequestDto),
  updateVehicleController.update,
);
vehicleRouter.patch(
  '/:id/toggle',
  validateDto(ValidUUIDRequestDto, 'params'),
  toggleVehicleController.updateActive,
);
vehicleRouter.patch(
  '/:id/disable',
  validateDto(ValidUUIDRequestDto, 'params'),
  disableVehicleController.updateDisable,
);

export default vehicleRouter;
