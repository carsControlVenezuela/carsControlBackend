export interface CountryResponseDto {
    id: string;
    name: string;
    active?:    boolean;
    createdAt?: Date;
    updatedAt?: Date;
}