import { DeepPartial, Repository } from 'typeorm';
import { Role } from '../../../domain/entities/role.entity';
import { RoleEntity } from '../psql/typeorm/entities/role.typeorm.entity';
import { BaseTypeormRepository } from '../../../../core/infrastructure/database/repositories/base.repository';
import { RoleTypeormMapper } from '../../http/mappers/role.http.mapper';
import { IRoleRepository } from '../../../domain/repositories/iRole.repository';

export class RoleTypeormRepository extends BaseTypeormRepository<Role, RoleEntity> implements IRoleRepository{

    constructor(repo: Repository<RoleEntity>) {
        super(repo); 
    }

    protected toDomain(entity: RoleEntity): Role {
        return RoleTypeormMapper.toDomain(entity);
    }

    protected toPersistence(state: Role): DeepPartial<RoleEntity> {
        return RoleTypeormMapper.toPersistence(state);
    }

    protected getRelations(): string[] {
        return ['permissions'];
    }

}