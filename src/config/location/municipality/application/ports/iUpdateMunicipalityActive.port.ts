import { MunicipalityResponseDto } from "../dtos/responses/municipality.response.dto";


export interface IUpdateMunicipalityActivePort {
    execute(id: string): Promise<MunicipalityResponseDto>;
}