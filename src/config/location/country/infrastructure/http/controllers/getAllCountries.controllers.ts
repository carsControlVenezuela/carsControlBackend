import { Request, Response, NextFunction } from "express";
import { IGetAllCountriesPort } from "../../../application/ports/iGetAllCountries.port";
import { AppResponse } from "../../../../../../core/infrastructure/http/appResponse.http";

export class GetAllCountriesController {

    constructor(private readonly getAllCountriesPort: IGetAllCountriesPort ) {}

    getAll = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            AppResponse.ok(
                res, 
                await this.getAllCountriesPort.getAllCountries(), 
                'Países obtenidos exitosamente'
            );
        } catch (error) {
            next(error);
        }
    }

}