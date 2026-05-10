import { IBaseRepository } from '../../../core/domain/repositories/base.repository';
import { Permission } from '../entities/permission.entity';

export interface IPermissionRepository extends IBaseRepository<Permission>{
    save(permission: Permission): Promise<void>;
    findByResourceAndAction(resource: string, action: string): Promise<Permission | null>;
    findByIds(ids: string[]): Promise<Permission[]>;
}