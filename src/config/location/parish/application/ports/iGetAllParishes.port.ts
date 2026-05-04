import { ParishResponseDto } from "../dtos/responses/parish.response.dto";

export interface IGetAllParishesPort {
    execute(): Promise<ParishResponseDto[]>;
}