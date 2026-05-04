import { Request, Response, NextFunction } from 'express';
import { getPaginationParams } from '../http/helpers/pagination.helper';
import { AppResponse } from '../http/appResponse.http';
import { IPaginatedPort } from '../../application/ports/iPaginated.port';

export class FindAllPaginatedController<TResponse> {
    constructor(
        private readonly useCase: IPaginatedPort<TResponse>,
        private readonly message: string
    ) {}

    getAllPaginated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const params = getPaginationParams(req);
            const result = await this.useCase.execute(params);
            AppResponse.ok(
                res, 
                result, 
                this.message
            );
        } catch (error) {
            next(error);
        }
    };
}