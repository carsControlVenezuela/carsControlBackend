import { DeepPartial, Repository } from 'typeorm';
import { Role } from '../../../domain/entities/role.entity';
import { RoleEntity } from '../psql/typeorm/entities/role.typeorm.entity';
import { BaseTypeormRepository } from '../../../../core/infrastructure/database/repositories/base.repository';
import { RoleTypeormMapper } from '../../http/mappers/role.http.mapper';
import { IRoleRepository } from '../../../domain/repositories/iRole.repository';
import { Permission } from '../../../../permission/domain/entities/permission.entity';
import { PermissionEntity } from '../../../../permission/infrastructure/database/psql/typeorm/entities/permission.typeorm.entity';

export class RoleRepository extends BaseTypeormRepository<Role, RoleEntity> implements IRoleRepository{

    constructor(repo: Repository<RoleEntity>) {
        super(repo); 
    }

    protected toDomain(entity: RoleEntity): Role {
        return RoleTypeormMapper.toDomain(entity);
    }

    protected toPersistence(role: Role): DeepPartial<RoleEntity> {
        return RoleTypeormMapper.toPersistence(role);
    }

    protected getRelations(): string[] {
        return ['permissions'];
    }

    async save(role: Role, permissions: Permission[]): Promise<void> {

        const entity = this.repo.create({
            ...RoleTypeormMapper.toPersistence(role), 
            permissions: permissions.map(p => ({ id: p.getId }) as PermissionEntity)
        });

        await this.repo.save(entity);
        
    }

    async updateRoleWithPermissions(role: Role, permissions?: Permission[]): Promise<void> {

        const entity: DeepPartial<RoleEntity> = {...RoleTypeormMapper.toPersistence(role)};

        if (permissions) {
            entity.permissions = permissions.map(p => ({ id: p.getId }) as PermissionEntity);
        }

        await this.repo.save(entity);
    }

}