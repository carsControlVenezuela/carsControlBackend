import { ParishRequestDto } from "../dtos/requests/parish.request.dto";

export interface ICreateParishPort{
    execute(request: ParishRequestDto):Promise<void>
}