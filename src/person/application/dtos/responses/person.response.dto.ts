export interface PersonResponseDto {
    id: string;
    idUser: string;
    //idPostalZone: string;
    cedula: string;
    firstName: string;
    lastName: string;
    birthday: Date;
    gender: string;
    avatar?: string;
    middleName?: string;
    secondName?: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}