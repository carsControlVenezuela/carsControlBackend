import { Router } from 'express';
import { VehicleTypeormRepository } from '../../database/psql/typeorm/repositories/vehicle.typeorm.repository';
import { ModelTypeormRepository } from '../../../../config/vehicle/model/infrastructure/database/psql/typeorm/repositories/model.typeorm.repository';
import { CreateVehicleUseCase } from '../../../application/uses-cases/createVehicle.use-case';
import { GetVehicleByIdUseCase } from '../../../application/uses-cases/getVehicleById.use-case';
import { GetVehiclesByPersonUseCase } from '../../../application/uses-cases/getVehiclesByPerson.use-case';
import { UpdateVehicleUseCase } from '../../../application/uses-cases/updateVehicle.use-case';
import { DeleteVehicleUseCase } from '../../../application/uses-cases/deleteVehicle.use-case';
import { CreateVehicleController } from '../controllers/createVehicle.controller';
import { GetVehicleByIdController } from '../controllers/getVehicleById.controller';
import { GetVehiclesByPersonController } from '../controllers/getVehiclesByPerson.controller';
import { UpdateVehicleController } from '../controllers/updateVehicle.controller';
import { DeleteVehicleController } from '../controllers/deleteVehicle.controller';
import { validateDto } from '../../../../core/infrastructure/middlewares/validateDto.middleware';
import { CreateVehicleRequestDto } from '../dtos/requests/createVehicle.request.dto';
import { UpdateVehicleRequestDto } from '../dtos/requests/updateVehicle.request.dto';
import { ValidUUIDRequestDto } from '../../../../core/infrastructure/dtos/request/validUUID.request.dto';
import { ValidPersonUUIDRequestDto } from '../dtos/requests/validPersonUUID.request.dto';

const vehicleRepository = new VehicleTypeormRepository();
const modelRepository = new ModelTypeormRepository();

const createVehicleUseCase = new CreateVehicleUseCase(vehicleRepository, modelRepository);
const getVehicleByIdUseCase = new GetVehicleByIdUseCase(vehicleRepository);
const getVehiclesByPersonUseCase = new GetVehiclesByPersonUseCase(vehicleRepository);
const updateVehicleUseCase = new UpdateVehicleUseCase(vehicleRepository);
const deleteVehicleUseCase = new DeleteVehicleUseCase(
  vehicleRepository.delete.bind(vehicleRepository),
);

const createVehicleController = new CreateVehicleController(createVehicleUseCase);
const getVehicleByIdController = new GetVehicleByIdController(getVehicleByIdUseCase);
const getVehiclesByPersonController = new GetVehiclesByPersonController(getVehiclesByPersonUseCase);
const updateVehicleController = new UpdateVehicleController(updateVehicleUseCase);
const deleteVehicleController = new DeleteVehicleController(deleteVehicleUseCase);

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
vehicleRouter.delete(
  '/:id',
  validateDto(ValidUUIDRequestDto, 'params'),
  deleteVehicleController.delete,
);

export default vehicleRouter;
