import { StateResponseDto } from "../dtos/responses/state.response.dto";

export interface IGetAllStatesByKeywordsPort {
  execute(keyword: string): Promise<StateResponseDto[]>;
}