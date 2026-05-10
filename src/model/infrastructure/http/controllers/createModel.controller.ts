import { Request, Response, NextFunction } from 'express';
import { ICreateModelPort } from '../../../application/ports/iCreateModel.port';
import { AppResponse } from '../../../../core/infrastructure/http/appResponse.http';
import { IBrandRepository } from '../../../../brand/domain/repositories/iBrand.repository';
import { ModelMapper } from '../../../application/mappers/model.mapper';

export class CreateModelController {
  constructor(
    private readonly createModelPort: ICreateModelPort,
    private readonly brandRepository: IBrandRepository,
  ) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const model = await this.createModelPort.execute(req.body, this.brandRepository);
      AppResponse.created(res, ModelMapper.toResponse(model), 'Model created successfully');
    } catch (error) {
      next(error);
    }
  };
}
