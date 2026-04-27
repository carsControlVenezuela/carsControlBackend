import { Request, Response, NextFunction } from 'express';
import { IFindAllActivePort } from '../../application/ports/iFindAllActive.port';
import { AppResponse } from '../http/appResponse.http';

export class FindAllActiveController<T> {

    constructor(private readonly findAllActiveUseCase: IFindAllActivePort<T>) {}

    getAllActive = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            console.log("Entro en el controlador")
            AppResponse.ok(
                res,
                await this.findAllActiveUseCase.execute(),
                'Busqueda exitosa'
            )
        } catch (error) {
            next(error);
        }
    }
}