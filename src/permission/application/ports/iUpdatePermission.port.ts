import { UpdatePermissionInputDto } from "../dtos/requests/updatePermission.requet.dto";

export interface IUpdatePermissionPort {
    execute(id: string, request: UpdatePermissionInputDto): Promise<void>;
}