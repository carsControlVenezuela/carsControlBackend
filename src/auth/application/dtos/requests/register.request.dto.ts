export interface RegisterInputDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    cedula: string;
    birthday: Date;
    gender: string;
    middleName?: string;
    secondName?: string;
    //idPostalZone: string;
}