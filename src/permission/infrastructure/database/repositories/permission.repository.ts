import { DeepPartial, In, Repository } from 'typeorm';
import { Permission } from '../../../domain/entities/permission.entity';
import { BaseTypeormRepository } from '../../../../core/infrastructure/database/repositories/base.repository';
import { PermissionEntity } from '../psql/typeorm/entities/permission.typeorm.entity';
import { IPermissionRepository } from '../../../domain/repositories/iPermission.repository';
import { PermissionTypeormMapper } from '../../http/mappers/permission.http.mapper';

export class PermissionRepository extends BaseTypeormRepository<Permission, PermissionEntity> implements IPermissionRepository {

    constructor(repo: Repository<PermissionEntity>) {
        super(repo); 
    }

    protected toDomain(entity: PermissionEntity): Permission {
        return PermissionTypeormMapper.toDomain(entity);
    }

    protected toPersistence(state: Permission): DeepPartial<PermissionEntity> {
        return PermissionTypeormMapper.toPersistence(state);
    }

    async save(permission: Permission): Promise<void> {

        await this.repo.save(this.repo.create(PermissionTypeormMapper.toPersistence(permission)));
        
    }

    async findByResourceAndAction(resource: string, action: string): Promise<Permission | null> {
        const entity = await this.repo.findOneBy({ resource, action });
        if (!entity) return null;
        return this.toDomain(entity);
    }

    async findByIds(ids: string[]): Promise<Permission[]> {
        const entities = await this.repo.findBy({ id: In(ids) });
        return entities.map(e => this.toDomain(e));
    }

}