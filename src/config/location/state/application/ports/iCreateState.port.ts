import { StateRequestDto } from "../dtos/requests/state.request.dto";

export interface ICreateStatePort {
    execute(request: StateRequestDto): Promise<void>;
}