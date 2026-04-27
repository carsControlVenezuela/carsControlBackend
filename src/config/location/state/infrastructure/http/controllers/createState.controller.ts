import { Request, Response, NextFunction } from 'express';
import { AppResponse } from "../../../../../../core/infrastructure/http/appResponse.http";
import { ICreateStatePort } from "../../../application/ports/iCreateState.port";

export class CreateStateController {

    constructor(private readonly createStateUseCase: ICreateStatePort) {}

    create = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {

        try {
            AppResponse.created(
                res,
                await this.createStateUseCase.execute(req.body),
                'Estado creado exitosamente'
            );
        } catch (error) {
            next(error);
        }
    }
}