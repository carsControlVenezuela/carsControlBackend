export interface PermissionResponseDto {
    id: string;
    name: string;
    resource: string;
    action: string;
    description: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}