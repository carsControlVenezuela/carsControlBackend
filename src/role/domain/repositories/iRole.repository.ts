import { IBaseRepository } from "../../../core/domain/repositories/base.repository";
import { Permission } from "../../../permission/domain/entities/permission.entity";
import { Role } from "../entities/role.entity";

export interface IRoleRepository extends IBaseRepository<Role> {
    save(role: Role, permissions: Permission[]): Promise<void>;
    findByName(name: string): Promise<Role | null>;
    updateRoleWithPermissions(role: Role, permissions?: Permission[]): Promise<void>;
}