import { Request, Response, NextFunction } from 'express';
import { ICreateVehiclePort } from '../../../application/ports/iCreateVehicle.port';
import { AppResponse } from '../../../../core/infrastructure/http/appResponse.http';
import { IModelRepository } from '../../../../model/domain/repositories/iModel.repository';

export class CreateVehicleController {
  constructor(
    private readonly createVehiclePort: ICreateVehiclePort,
    private readonly modelRepository: IModelRepository,
  ) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.createVehiclePort.execute(req.body, this.modelRepository);
      AppResponse.created(res, req.body, 'Vehicle created successfully');
    } catch (error) {
      next(error);
    }
  };
}
