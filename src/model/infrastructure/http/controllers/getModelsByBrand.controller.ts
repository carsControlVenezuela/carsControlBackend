import { Request, Response, NextFunction } from 'express';
import { IGetModelsByBrandPort } from '../../../application/ports/iGetModelsByBrand.port';
import { AppResponse } from '../../../../core/infrastructure/http/appResponse.http';

export class GetModelsByBrandController {
  constructor(private readonly getModelsByBrandPort: IGetModelsByBrandPort) {}

  getByBrand = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const models = await this.getModelsByBrandPort.execute(req.params.idBrand as string);
      AppResponse.ok(res, models, 'Models obtained successfully');
    } catch (error) {
      next(error);
    }
  };
}