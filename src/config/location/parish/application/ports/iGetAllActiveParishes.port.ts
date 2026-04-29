import { ParishResponseDto } from "../dtos/responses/parish.response.dto";


export interface IGetAllActiveParishesPort {
    execute(): Promise<ParishResponseDto[]>;
}