import { Request, Response, NextFunction } from "express";
import { AppResponse } from "../../../../../../core/infrastructure/http/appResponse.http";
import { IGetAllParishesPort } from "../../../application/ports/iGetAllParishes.port";

export class GetAllParishesController {

    constructor(private readonly getAllParishesPort: IGetAllParishesPort ) {}

    getAll = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            AppResponse.ok(
                res, 
                await this.getAllParishesPort.execute(), 
                'Parroquias obtenidas exitosamente'
            );
        } catch (error) {
            next(error);
        }
    }

}