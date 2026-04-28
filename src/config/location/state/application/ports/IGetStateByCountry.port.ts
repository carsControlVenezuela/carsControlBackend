import { StateResponseDto } from "../dtos/responses/state.response.dto";

export interface IGetStatesByCountryPort {
    execute(countryId: string): Promise<StateResponseDto[]>;
}