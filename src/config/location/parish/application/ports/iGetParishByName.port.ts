import { ParishResponseDto } from "../dtos/responses/parish.response.dto";


export interface IGetParishByNamePort {
    execute(name: string): Promise<ParishResponseDto>;
}