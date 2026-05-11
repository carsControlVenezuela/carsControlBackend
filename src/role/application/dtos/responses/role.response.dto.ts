import { PermissionResponseDto } from '../../../../permission/application/dtos/responses/permission.response.dto';

export interface RoleResponseDto {
    id: string;
    name: string;
    description: string;
    permissions: PermissionResponseDto[];
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}