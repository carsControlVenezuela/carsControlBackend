import { Request, Response, NextFunction } from 'express';
import { IGetAllModelsPort } from '../../../application/ports/iGetAllModels.port';
import { AppResponse } from '../../../../core/infrastructure/http/appResponse.http';

export class GetAllModelsController {
  constructor(private readonly getAllModelsPort: IGetAllModelsPort) {}

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const models = await this.getAllModelsPort.execute();
      AppResponse.ok(res, models, 'Models obtained successfully');
    } catch (error) {
      next(error);
    }
  };
}