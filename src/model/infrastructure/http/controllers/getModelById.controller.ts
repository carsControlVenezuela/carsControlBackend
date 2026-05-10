import { Request, Response, NextFunction } from 'express';
import { IGetModelByIdPort } from '../../../application/ports/iGetModelById.port';
import { AppResponse } from '../../../../core/infrastructure/http/appResponse.http';

export class GetModelByIdController {
  constructor(private readonly getModelByIdPort: IGetModelByIdPort) {}

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const model = await this.getModelByIdPort.execute(req.params.id as string);
      AppResponse.ok(res, model, 'Model obtained successfully');
    } catch (error) {
      next(error);
    }
  };
}