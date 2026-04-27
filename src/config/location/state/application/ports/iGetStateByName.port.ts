import { StateResponseDto } from "../dtos/responses/state.response.dto";

export interface IGetStateByNamePort {
    execute(name: string): Promise<StateResponseDto>;
}