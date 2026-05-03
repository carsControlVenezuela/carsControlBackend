import { DeepPartial } from "typeorm";
import { Role } from "../../../domain/entities/role.entity";
import { RoleEntity } from "../../database/psql/typeorm/entities/role.typeorm.entity";

export class RoleTypeormMapper {

    static toDomain(entity: RoleEntity): Role {
    
        const permissions = entity.permissions?.map(p =>`${p.resource}:${p.action}`) ?? [];

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
        };
    }
  
}