import { Request, Response, NextFunction } from 'express';
import { IUpdateBrandPort } from '../../../application/ports/iUpdateBrand.port';
import { AppResponse } from '../../../../core/infrastructure/http/appResponse.http';

export class UpdateBrandController {
  constructor(private readonly updateBrandPort: IUpdateBrandPort) {}

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const brand = await this.updateBrandPort.execute(req.params.id as string, req.body);
      AppResponse.ok(res, brand, 'Brand updated successfully');
    } catch (error) {
      next(error);
    }
  };
}
