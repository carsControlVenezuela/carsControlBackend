import { Request, Response, NextFunction } from 'express';
import { IFindByNamePort } from "../../application/ports/iFindByName.port";
import { AppResponse } from '../http/appResponse.http';

export class FindByNameController<T> {

    constructor(private readonly findByNameUseCase: IFindByNamePort<T>) {}

    getByName = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {  
        try {
            AppResponse.ok(
                res,
                await this.findByNameUseCase.execute(req.params.name as string),
                'Busqueda exitosa'
            )
        } catch (error) {
            next(error);
        }
    }

}