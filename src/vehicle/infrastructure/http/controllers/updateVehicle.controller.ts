import { Request, Response, NextFunction } from 'express';
import { IUpdateVehiclePort } from '../../../application/ports/iUpdateVehicle.port';
import { AppResponse } from '../../../../core/infrastructure/http/appResponse.http';

export class UpdateVehicleController {
  constructor(private readonly updateVehiclePort: IUpdateVehiclePort) {}

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const vehicle = await this.updateVehiclePort.execute(req.params.id as string, req.body);
      AppResponse.ok(res, vehicle, 'Vehicle updated successfully');
    } catch (error) {
      next(error);
    }
  };
}