import { PersonResponseDto } from "../dtos/responses/person.response.dto";

export interface IGetAllPersonsByKeywordsPort {
    execute(keyword: string): Promise<PersonResponseDto[]>;
}