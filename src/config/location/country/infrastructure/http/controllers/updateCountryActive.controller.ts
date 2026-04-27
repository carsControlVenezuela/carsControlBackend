import { Request, Response, NextFunction } from 'express';
import { IUpdateCountryActivePort } from "../../../application/ports/iUpdateCountryActive.port";
import { AppResponse } from '../../../../../../core/infrastructure/http/appResponse.http';

export class UpdateCountryActiveController  {

    constructor(private readonly updateCountryActivePort: IUpdateCountryActivePort) {}

    updateCountryActive = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            AppResponse.ok(
                res,
                await this.updateCountryActivePort.execute(req.params.id as string),
                'Estado del país actualizado exitosamente'
            )
        } catch (error) {
            next(error);
        }
    }

}