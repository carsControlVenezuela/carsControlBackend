import { MunicipalityResponseDto } from "../dtos/responses/municipality.response.dto";

export interface IGetAllMunicipalitiesPort {
    execute(): Promise<MunicipalityResponseDto[]>;
}