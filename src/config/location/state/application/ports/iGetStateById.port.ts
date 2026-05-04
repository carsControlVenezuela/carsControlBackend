import { StateResponseDto } from "../dtos/responses/state.response.dto";

export interface IGetStateByIdPort {
    execute(id: string): Promise<StateResponseDto>;
}