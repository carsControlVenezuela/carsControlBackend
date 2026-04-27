import { StateResponseDto } from "../dtos/responses/state.response.dto";

export interface IUpdateStateActivePort {
    execute(id: string): Promise<StateResponseDto>;
}