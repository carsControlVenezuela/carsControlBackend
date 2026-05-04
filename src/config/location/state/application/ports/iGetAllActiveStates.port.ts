import { StateResponseDto } from "../dtos/responses/state.response.dto";

export interface IGetAllActiveStatesPort {
    execute(): Promise<StateResponseDto[]>;
}