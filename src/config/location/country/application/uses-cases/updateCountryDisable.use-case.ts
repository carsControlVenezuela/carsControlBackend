import { ILogger } from "../../../../../core/domain/logger/logger.interface";
import { AppLogger } from "../../../../../core/infrastructure/logger/winston.logger";
import { ICountryRepository } from "../../domain/repositories/ICountry.repository";
import { findCountryOrFail } from "../helpers/findCountryOrFail.helper";
import { IUpdateCountryDisablePort } from "../ports/iUpdateCountryDisable.port";

export class UpdateCountryDisableUseCase implements IUpdateCountryDisablePort {

    private readonly logger: ILogger = AppLogger;

    constructor(private countryRepository: ICountryRepository) {}

    async execute(id: string): Promise<void> {

        this.logger.info(`Actualizando el estado deshabilitado del país con id ${id}`, {context: 'UpdateCountryDisableUseCase'});

        const country = await findCountryOrFail(this.countryRepository, id);

        country.deactivate();

        await this.countryRepository.update(country);

        this.logger.info(`Se ha eliminado país con id ${id} ha sido actualizado`, {context: 'UpdateCountryDisableUseCase'});

    }
}