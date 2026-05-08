import { UpdatePersonRequestDto } from "../dtos/requests/updatePerson.request.dto";

export interface IUpdatePersonPort {
  execute(id: string, request: UpdatePersonRequestDto): Promise<void>;
}