import { Request, Response, NextFunction } from 'express';
import { IUpdateVehicleRepairPort } from "../../../application/ports/iUpdateVehicleRepair.port";
import { AppResponse } from '../../../../core/infrastructure/http/appResponse.http';
import { UpdateVehicleRepairRequestDTO } from '../dtos/requests/updateVehicleRepair.request.http.dto';

export class UpdateVehicleRepairController {

    constructor (private readonly updateVehicleRepairPort: IUpdateVehicleRepairPort) {}

    updateVehicleRepair = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
            AppResponse.ok(
                res,
                await this.updateVehicleRepairPort.execute(req.params.id as string, req.body as UpdateVehicleRepairRequestDTO),
                'Taller actualizado exitosamente'
            );
        } catch (error) {
            next(error);
        }
    }
}