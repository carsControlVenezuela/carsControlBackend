import { CreateRoleInputDto } from "../dtos/requests/createRole.request.dto";

export interface ICreateRolePort {
    execute(request: CreateRoleInputDto): Promise<void>;
}