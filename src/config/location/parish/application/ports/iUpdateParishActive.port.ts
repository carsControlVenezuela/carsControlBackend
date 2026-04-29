import { ParishResponseDto } from "../dtos/responses/parish.response.dto";


export interface IUpdateParishActivePort {
    execute(id: string): Promise<ParishResponseDto>;
}