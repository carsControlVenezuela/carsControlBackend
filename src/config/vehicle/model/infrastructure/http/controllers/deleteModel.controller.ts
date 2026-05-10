import { Request, Response, NextFunction } from 'express';
import { IDeleteModelPort } from '../../../application/ports/iDeleteModel.port';
import { AppResponse } from '../../../../../../core/infrastructure/http/appResponse.http';

export class DeleteModelController {
  constructor(private readonly deleteModelPort: IDeleteModelPort) {}

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.deleteModelPort.execute(req.params.id as string);
      AppResponse.ok(res, null, 'Model deleted successfully');
    } catch (error) {
      next(error);
    }
  };
}
