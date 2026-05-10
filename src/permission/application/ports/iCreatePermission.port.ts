import { CreatePermissionInputDto } from "../dtos/requests/createPermission.requet.dto";

export interface ICreatePermissionPort {
    execute(request: CreatePermissionInputDto): Promise<void>;
}