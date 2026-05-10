import { Request, Response, NextFunction } from 'express';
import { ICreateBrandPort } from '../../../application/ports/iCreateBrand.port';
import { AppResponse } from '../../../../core/infrastructure/http/appResponse.http';

export class CreateBrandController {
  constructor(private readonly createBrandPort: ICreateBrandPort) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.createBrandPort.execute(req.body);
      AppResponse.created(res, req.body, 'Brand created successfully');
    } catch (error) {
      next(error);
    }
  };
}
