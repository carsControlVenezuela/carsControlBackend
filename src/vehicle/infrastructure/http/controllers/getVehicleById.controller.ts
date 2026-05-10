import { Request, Response, NextFunction } from 'express';
import { IGetVehicleByIdPort } from '../../../application/ports/iGetVehicleById.port';
import { AppResponse } from '../../../../core/infrastructure/http/appResponse.http';

export class GetVehicleByIdController {
  constructor(private readonly getVehicleByIdPort: IGetVehicleByIdPort) {}

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const vehicle = await this.getVehicleByIdPort.execute(req.params.id as string);
      AppResponse.ok(res, vehicle, 'Vehicle obtained successfully');
    } catch (error) {
      next(error);
    }
  };
}