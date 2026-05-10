import { ILogger } from '../../../core/domain/logger/logger.interface';
import { AppLogger } from '../../../core/infrastructure/logger/winston.logger';
import { IVehicleRepository } from '../../domain/repositories/iVehicle.repository';
import { Vehicle } from '../../domain/entities/vehicle.entity';
import { VehicleRequestDto } from '../dtos/requests/vehicle.request.dto';
import { VehicleMapper } from '../mappers/vehicle.mapper';
import { ICreateVehiclePort } from '../ports/iCreateVehicle.port';
import { ModelNotFoundException } from '../../domain/exceptions/modelNotFound.exception';
import { IModelRepository } from '../../../model/domain/repositories/iModel.repository';

export class CreateVehicleUseCase implements ICreateVehiclePort {
  private readonly logger: ILogger = AppLogger;

  constructor(
    private readonly vehicleRepository: IVehicleRepository,
    private readonly modelRepository: IModelRepository,
  ) {}

  async execute(request: VehicleRequestDto): Promise<Vehicle> {
    this.logger.info('Creating vehicle', { context: 'CreateVehicleUseCase', plate: request.plate });

    const model = await this.modelRepository.findById(request.idModel);
    if (!model) throw new ModelNotFoundException(request.idModel);

    const vehicle = await this.vehicleRepository.save(VehicleMapper.toDomain(request));

    this.logger.info('Vehicle created successfully', { context: 'CreateVehicleUseCase' });
    return vehicle;
  }
}
