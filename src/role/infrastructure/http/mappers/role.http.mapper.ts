import { DeepPartial } from "typeorm";
import { Role } from "../../../domain/entities/role.entity";
import { RoleEntity } from "../../database/psql/typeorm/entities/role.typeorm.entity";
import { Permission } from "../../../../permission/domain/entities/permission.entity";

export class RoleTypeormMapper {

    static toDomain(entity: RoleEntity): Role {

        const permissions: Permission[] = entity.permissions?.map(p => new Permission(p.name, p.resource, p.action, p.description, p.id, p.createdAt, p.updatedAt, p.active) ) ?? [];

        return new Role(
            entity.name,
            entity.description,
            permissions,
            entity.id,
            entity.createdAt,
            entity.updatedAt,
            entity.active
        );
    }

    static toPersistence(role: Role): DeepPartial<RoleEntity> {

        return {
            ...(role.getId && { id: role.getId }),
            name: role.getName,
            description: role.getDescription,
            active: role.active,
            updatedAt: role.updatedAt
        };
        
    }
}