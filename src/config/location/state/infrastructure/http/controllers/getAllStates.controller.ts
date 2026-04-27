import { Request, Response, NextFunction } from "express";
import { AppResponse } from "../../../../../../core/infrastructure/http/appResponse.http";
import { IGetAllStatesPort } from "../../../application/ports/iGetAllStates.port";

export class GetAllStatesController {

    constructor(private readonly getAllStatesPort: IGetAllStatesPort ) {}

    getAll = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            AppResponse.ok(
                res, 
                await this.getAllStatesPort.execute(), 
                'Estados obtenidos exitosamente'
            );
        } catch (error) {
            next(error);
        }
    }

}