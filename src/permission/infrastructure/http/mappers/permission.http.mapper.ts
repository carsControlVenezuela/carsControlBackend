import { DeepPartial } from 'typeorm';
import { PermissionEntity } from '../../database/psql/typeorm/entities/permission.typeorm.entity';
import { Permission } from '../../../domain/entities/permission.entity';

export class PermissionTypeormMapper {

    static toDomain(entity: PermissionEntity): Permission {
        return new Permission(
            entity.name,
            entity.resource,
            entity.action,
            entity.description,
            entity.id,
            entity.createdAt,
            entity.updatedAt,
            entity.active
        );
    }

    static toPersistence(permission: Permission): DeepPartial<PermissionEntity> {
        return {
            ...(permission.getId && { id: permission.getId }),
            name: permission.getName,
            resource: permission.getResource,
            action: permission.getAction,
            description: permission.getDescription,
            active: permission.active
        };
    }
}