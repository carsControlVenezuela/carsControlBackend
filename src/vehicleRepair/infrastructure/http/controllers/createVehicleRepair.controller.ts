import { Request, Response, NextFunction } from 'express';
import { ICreateVehicleRepairPort } from "../../../application/ports/iCreateVehicleRepair.port";
import { AppResponse } from '../../../../core/infrastructure/http/appResponse.http';

export class CreateVehicleRepairController {

    constructor(private readonly createVehicleRepairUseCase: ICreateVehicleRepairPort) {}

    create = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {

        try {
            AppResponse.created(
                res,
                await this.createVehicleRepairUseCase.execute(req.body),
                'Taller registrado exitosamente'
            );
        } catch (error) {
            next(error);
        }
    }
}