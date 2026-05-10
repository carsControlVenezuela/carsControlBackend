import { Request, Response, NextFunction } from 'express';
import { IGetAllBrandsPort } from '../../../application/ports/iGetAllBrands.port';
import { AppResponse } from '../../../../core/infrastructure/http/appResponse.http';

export class GetAllBrandsController {
  constructor(private readonly getAllBrandsPort: IGetAllBrandsPort) {}

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const brands = await this.getAllBrandsPort.execute();
      AppResponse.ok(res, brands, 'Brands obtained successfully');
    } catch (error) {
      next(error);
    }
  };
}