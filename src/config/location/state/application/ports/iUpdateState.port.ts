import { StateRequestDto } from "../dtos/requests/state.request.dto";
import { StateResponseDto } from "../dtos/responses/state.response.dto";

export interface IUpdateStatePort {
  execute(id: string, request: StateRequestDto): Promise<StateResponseDto>;
}