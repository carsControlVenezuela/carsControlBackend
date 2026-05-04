import { ParishRequestDto } from "../dtos/requests/parish.request.dto";
import { ParishResponseDto } from "../dtos/responses/parish.response.dto";

export interface IUpdateParishPort {
  execute(id: string, request: ParishRequestDto): Promise<ParishResponseDto>;
}