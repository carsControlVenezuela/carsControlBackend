export interface CreateRoleInputDto {
    name: string;
    description: string;
    permissionIds: string[];
}