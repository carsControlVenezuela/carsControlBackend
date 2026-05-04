import { Request, Response, NextFunction } from 'express';
import { IFindAllPort } from "../../application/ports/iFindAll.port";
import { AppResponse } from '../http/appResponse.http';

export class FindAllController<T> {

    constructor(private readonly findAllUseCase: IFindAllPort<T>) {}

    getAll = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            console.log("Entro en el controlador")
            AppResponse.ok(
                res,
                await this.findAllUseCase.execute(),
                'Busqueda exitosa'
            )
        } catch (error) {
            next(error);
        }
    }
}