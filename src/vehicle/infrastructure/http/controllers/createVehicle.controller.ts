import { Request, Response, NextFunction } from 'express';
import { ICreateVehiclePort } from '../../../application/ports/iCreateVehicle.port';
import { AppResponse } from '../../../../core/infrastructure/http/appResponse.http';
import { VehicleMapper } from '../../../application/mappers/vehicle.mapper';

export class CreateVehicleController {
  constructor(private readonly createVehiclePort: ICreateVehiclePort) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const vehicle = await this.createVehiclePort.execute(req.body);
      AppResponse.created(res, VehicleMapper.toResponse(vehicle), 'Vehicle created successfully');
    } catch (error) {
      next(error);
    }
  };
}
