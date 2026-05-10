import { PermissionMapper } from '../../../permission/application/mappers/permission.mapper';
import { Permission } from '../../../permission/domain/entities/permission.entity';
import { Role } from '../../domain/entities/role.entity';
import { CreateRoleInputDto } from '../dtos/requests/createRole.request.dto';
import { UpdateRoleInputDto } from '../dtos/requests/updateRole.request.dto';
import { RoleResponseDto } from '../dtos/responses/role.response.dto';

export class RoleMapper {

    static toResponse(role: Role): RoleResponseDto {
        if (!role.getId) throw new Error('Rol sin id no puede ser mapeado');
        return {
            id: role.getId,
            name:  role.getName,
            description: role.getDescription,
            permissions: role.getPermissions.map(PermissionMapper.toResponse),
            active: role.getActive,
            createdAt: role.getCreatedAt,
            updatedAt: role.getUpdatedAt
        };
    }

    static toDomain(dto: CreateRoleInputDto, permissions: Permission[]): Role {
        return new Role(dto.name, dto.description, permissions);
    }

    static merge(existing: Role, dto: UpdateRoleInputDto, permissions?: Permission[]): Role {
        if (dto.name) existing.setName = dto.name;
        if (dto.description) existing.setDescription = dto.description;
        if (permissions) existing.setPermissions = permissions;
        return existing;
    }

}