import { Request, Response, NextFunction } from 'express';
import { IUpdateModelPort } from '../../../application/ports/iUpdateModel.port';
import { AppResponse } from '../../../../../../core/infrastructure/http/appResponse.http';

export class UpdateModelController {
  constructor(private readonly updateModelPort: IUpdateModelPort) {}

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const model = await this.updateModelPort.execute(req.params.id as string, req.body);
      AppResponse.ok(res, model, 'Model updated successfully');
    } catch (error) {
      next(error);
    }
  };
}
