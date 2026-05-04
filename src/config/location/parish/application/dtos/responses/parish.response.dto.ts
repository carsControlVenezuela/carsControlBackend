export interface ParishResponseDto{
    id: string;
    idMunicipality: string;
    name: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}