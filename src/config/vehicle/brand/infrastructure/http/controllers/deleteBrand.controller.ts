import { Request, Response, NextFunction } from 'express';
import { IDeleteBrandPort } from '../../../application/ports/iDeleteBrand.port';
import { AppResponse } from '../../../../../../core/infrastructure/http/appResponse.http';

export class DeleteBrandController {
  constructor(private readonly deleteBrandPort: IDeleteBrandPort) {}

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.deleteBrandPort.execute(req.params.id as string);
      AppResponse.ok(res, null, 'Brand deleted successfully');
    } catch (error) {
      next(error);
    }
  };
}
