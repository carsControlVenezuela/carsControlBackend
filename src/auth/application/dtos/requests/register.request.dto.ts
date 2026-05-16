export interface RegisterInputDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    cedula: string;
    birthday: Date;
    gender: string;
    roleId: string;
    avatar?:string;
    middleName?: string;
    secondName?: string;
    //idPostalZone: string;
}