import { MunicipalityResponseDto } from "../dtos/responses/municipality.response.dto";


export interface IGetMunicipalityByIdPort {
    execute(id: string): Promise<MunicipalityResponseDto>;
}