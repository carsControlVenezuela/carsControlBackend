import { Request, Response, NextFunction } from 'express';
import { IGetBrandByIdPort } from '../../../application/ports/iGetBrandById.port';
import { AppResponse } from '../../../../core/infrastructure/http/appResponse.http';

export class GetBrandByIdController {
  constructor(private readonly getBrandByIdPort: IGetBrandByIdPort) {}

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const brand = await this.getBrandByIdPort.execute(req.params.id as string);
      AppResponse.ok(res, brand, 'Brand obtained successfully');
    } catch (error) {
      next(error);
    }
  };
}