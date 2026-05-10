import { Request, Response, NextFunction } from 'express';
import { IDeleteVehiclePort } from '../../../application/ports/iDeleteVehicle.port';
import { AppResponse } from '../../../../core/infrastructure/http/appResponse.http';

export class DeleteVehicleController {
  constructor(private readonly deleteVehiclePort: IDeleteVehiclePort) {}

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.deleteVehiclePort.execute(req.params.id as string);
      AppResponse.ok(res, null, 'Vehicle deleted successfully');
    } catch (error) {
      next(error);
    }
  };
}