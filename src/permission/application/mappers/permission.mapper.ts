import { Permission } from '../../domain/entities/permission.entity';
import { CreatePermissionInputDto } from '../dtos/requests/createPermission.requet.dto';
import { UpdatePermissionInputDto } from '../dtos/requests/updatePermission.requet.dto';
import { PermissionResponseDto } from '../dtos/responses/permission.response.dto';

export class PermissionMapper {

    static toResponse(permission: Permission): PermissionResponseDto {
        if (!permission.getId) throw new Error('Permiso sin id no puede ser mapeado');
        return {
            id: permission.getId,
            name: permission.getName,
            resource: permission.getResource,
            action: permission.getAction,
            description: permission.getDescription,
            active: permission.getActive,
            createdAt: permission.getCreatedAt,
            updatedAt: permission.getUpdatedAt
        };
    }

    static toDomain(dto: CreatePermissionInputDto): Permission {
        return new Permission(dto.name, dto.resource, dto.action, dto.description);
    }

    static merge(existing: Permission, dto: UpdatePermissionInputDto): Permission {
        if (dto.name) existing.setName = dto.name;
        if (dto.resource) existing.setResource = dto.resource;
        if (dto.action) existing.setAction = dto.action;
        if (dto.description) existing.setDescription = dto.description;
        return existing;
    }

}