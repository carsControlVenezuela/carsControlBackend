import { Request, Response, NextFunction } from 'express';
import { ICreateBrandPort } from '../../../application/ports/iCreateBrand.port';
import { AppResponse } from '../../../../../../core/infrastructure/http/appResponse.http';
import { BrandMapper } from '../../../application/mappers/brand.mapper';

export class CreateBrandController {
  constructor(private readonly createBrandPort: ICreateBrandPort) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const brand = await this.createBrandPort.execute(req.body);
      AppResponse.created(res, BrandMapper.toResponse(brand), 'Brand created successfully');
    } catch (error) {
      next(error);
    }
  };
}
