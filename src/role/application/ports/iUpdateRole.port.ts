import { UpdateRoleInputDto } from "../dtos/requests/updateRole.request.dto";

export interface IUpdateRolePort {
    execute(id: string, request: UpdateRoleInputDto): Promise<void>;
}