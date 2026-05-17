import { NotFoundByKeywordException } from "../../../core/domain/exceptions/NotFoundByKeyword.exception";
import { ILogger } from "../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../core/infrastructure/logger/winston.logger";
import { IVehicleRepairRepository } from "../../domain/repositories/iVehicleRepair.repository";
import { VehicleRepairResponseDto } from "../dtos/responses/vehicleRepair.response.dto";
import { VehicleRepairMapper } from "../mappers/vehicleRepair.mapper";
import { IGetAllVehiclesRepairByKeywordsPort } from "../ports/iGetAllVehiclesRepairByKeywords.port";

export class GetAllVehiclesRepairByKeywordsUseCase implements IGetAllVehiclesRepairByKeywordsPort {

    private readonly logger: ILogger = AppLogger;

    constructor(private readonly vehicleRepairRepository: IVehicleRepairRepository) {}

    async execute(keyword: string) : Promise<VehicleRepairResponseDto[]> {

        this.logger.info(`Buscando talleres con la palabra clave: ${keyword}`, {context: 'GetAllVehicleRepairsByKeywordsUseCase'});

        const vehicleRepairs = await this.vehicleRepairRepository.findAllByKeywords(keyword);

        if (vehicleRepairs.length === 0) throw new NotFoundByKeywordException('Talleres');

        this.logger.info(`Se encontraron ${vehicleRepairs.length} talleres`, {context: 'GetAllVehicleRepairsByKeywordsUseCase'});

        return vehicleRepairs.map(VehicleRepairMapper.toResponse);

    }

}