import { ParishResponseDto } from "../dtos/responses/parish.response.dto";



export interface IGetParishByIdPort {
    execute(id: string): Promise<ParishResponseDto>;
}