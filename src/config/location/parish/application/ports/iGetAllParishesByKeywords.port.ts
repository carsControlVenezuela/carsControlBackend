import {ParishResponseDto } from "../dtos/responses/parish.response.dto";

export interface IGetAllParishesByKeywordsPort {
  execute(keyword: string): Promise<ParishResponseDto[]>;
}