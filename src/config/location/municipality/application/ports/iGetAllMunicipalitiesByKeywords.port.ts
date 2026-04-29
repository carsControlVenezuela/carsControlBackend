import { MunicipalityResponseDto } from "../dtos/responses/municipality.response.dto";

export interface IGetAllMunicipalitiesByKeywordsPort {
  execute(keyword: string): Promise<MunicipalityResponseDto[]>;
}