import { Request, Response, NextFunction } from 'express';
import { IFindByIdPort } from "../../application/ports/iFindById.port";
import { AppResponse } from "../http/appResponse.http";

export class FindByIdController<T> {

    constructor(
        private readonly findByIdUseCase: IFindByIdPort<T>,

    ) {}

    getById = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            AppResponse.ok(
                res,
                await this.findByIdUseCase.execute(req.params.id as string),
                'Busqueda exitosa'
            )
        } catch (error) {
            next(error);
        }
    }

}