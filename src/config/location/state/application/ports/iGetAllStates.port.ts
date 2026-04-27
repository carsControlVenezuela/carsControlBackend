import { StateResponseDto } from "../dtos/responses/state.response.dto";

export interface IGetAllStatesPort {
    execute(): Promise<StateResponseDto[]>;
}