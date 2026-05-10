import { Request, Response, NextFunction } from 'express';
import { IGetVehiclesByPersonPort } from '../../../application/ports/iGetVehiclesByPerson.port';
import { AppResponse } from '../../../../core/infrastructure/http/appResponse.http';

export class GetVehiclesByPersonController {
  constructor(private readonly getVehiclesByPersonPort: IGetVehiclesByPersonPort) {}

  getByPerson = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const vehicles = await this.getVehiclesByPersonPort.execute(req.params.idPerson as string);
      AppResponse.ok(res, vehicles, 'Vehicles obtained successfully');
    } catch (error) {
      next(error);
    }
  };
}