import { Request, Response, NextFunction } from 'express';
import { ICreateModelPort } from '../../../application/ports/iCreateModel.port';
import { AppResponse } from '../../../../core/infrastructure/http/appResponse.http';
import { IBrandRepository } from '../../../../brand/domain/repositories/iBrand.repository';

export class CreateModelController {
  constructor(
    private readonly createModelPort: ICreateModelPort,
    private readonly brandRepository: IBrandRepository,
  ) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.createModelPort.execute(req.body, this.brandRepository);
      AppResponse.created(res, req.body, 'Model created successfully');
    } catch (error) {
      next(error);
    }
  };
}
