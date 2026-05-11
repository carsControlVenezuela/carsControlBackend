import { Permission } from "../../domain/entities/permission.entity";
import { PermissionNotFoundException } from "../../domain/exceptions/permissionNotFound.exception";
import { IPermissionRepository } from "../../domain/repositories/iPermission.repository";

export async function findPermissionOrFail(repository: IPermissionRepository, id: string): Promise<Permission> {
    const permission = await repository.findById(id);
    if (!permission) throw new PermissionNotFoundException(id);
    return permission;
}