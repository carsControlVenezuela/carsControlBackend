import { MunicipalityRequestDto } from "../dtos/requests/municipality.request.dto";
import { MunicipalityResponseDto } from "../dtos/responses/municipality.response.dto";

export interface IUpdateMunicipalityPort {
  execute(id: string, request: MunicipalityRequestDto): Promise<MunicipalityResponseDto>;
}