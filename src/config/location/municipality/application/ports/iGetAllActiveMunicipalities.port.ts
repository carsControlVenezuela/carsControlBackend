import { MunicipalityResponseDto } from "../dtos/responses/municipality.response.dto";


export interface IGetAllActiveMunicipalitiesPort {
    execute(): Promise<MunicipalityResponseDto[]>;
}