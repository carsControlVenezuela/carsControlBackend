import { Request, Response, NextFunction } from "express";
import { AppResponse } from "../../../../../../core/infrastructure/http/appResponse.http";
import { IGetAllMunicipalitiesPort } from "../../../application/ports/iGetAllMunicipalities.port";

export class GetAllMunicipalitiesController {

    constructor(private readonly getAllMunicipalitiesPort: IGetAllMunicipalitiesPort ) {}

    getAll = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            AppResponse.ok(
                res, 
                await this.getAllMunicipalitiesPort.execute(), 
                'Municipios obtenidos exitosamente'
            );
        } catch (error) {
            next(error);
        }
    }

}