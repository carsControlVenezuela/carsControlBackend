import { MunicipalityResponseDto } from "../dtos/responses/municipality.response.dto";


export interface IGetMunicipalityByNamePort {
    execute(name: string): Promise<MunicipalityResponseDto>;
}