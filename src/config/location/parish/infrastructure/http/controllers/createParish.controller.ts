import { Request, Response, NextFunction } from 'express';
import { AppResponse } from "../../../../../../core/infrastructure/http/appResponse.http";
import { ICreateParishPort } from '../../../application/ports/iCreateParish.port';


export class CreateParishController {

    constructor(private readonly createParishUseCase: ICreateParishPort) {}

    create = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {

        try {
            AppResponse.created(
                res,
                await this.createParishUseCase.execute(req.body),
                'Parroquia creada exitosamente'
            );
        } catch (error) {
            next(error);
        }
    }
}