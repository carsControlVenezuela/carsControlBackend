import { AuditEntity } from '../../../core/domain/entities/audit.entity';

export class Person extends AuditEntity {
    private readonly _id?: string;
    private _idUser: string;
    // private _idPostalZone: string;
    private _cedula: string;
    private _firstName: string;
    private _lastName: string;
    private _birthday: Date;
    private _gender: string;
    private _avatar?: string;
    private _middleName?: string;
    private _secondName?: string;

    constructor(
        idUser: string,
        // idPostalZone: string,
        cedula: string,
        firstName: string,
        lastName: string,
        birthday: Date,
        gender: string,
        avatar?: string,
        middleName?: string,
        secondName?: string,
        id?: string,
        createdAt?: Date,
        updatedAt?: Date,
        active?: boolean
    ) {
        super(createdAt, updatedAt, active);
        this._id = id;
        this._idUser = idUser;
        // this._idPostalZone = idPostalZone;
        this._cedula = cedula;
        this._firstName = firstName;
        this._lastName = lastName;
        this._birthday = birthday;
        this._gender = gender;
        this._avatar = avatar;
        this._middleName = middleName;
        this._secondName = secondName;
        this.validate();
    }

    get getId(): string | undefined { return this._id; }
    get getIdUser(): string { return this._idUser; }
    //get getIdPostalZone(): string { return this._idPostalZone; }
    get getCedula(): string { return this._cedula; }
    get getFirstName(): string { return this._firstName; }
    get getLastName(): string { return this._lastName; }
    get getBirthday(): Date { return this._birthday; }
    get getGender(): string { return this._gender; }
    get getAvatar(): string | undefined { return this._avatar; }
    get getMiddleName(): string | undefined { return this._middleName; }
    get getSecondName(): string | undefined { return this._secondName; }

    set setFirstName(value: string) {
        if (!value || value.trim() === '') {
            throw new Error('El nombre es requerido');
        }
        this._firstName = value;
        this.touch();
    }

    set setLastName(value: string) {
        if (!value || value.trim() === '') {
            throw new Error('El apellido es requerido');
        }
        this._lastName = value;
        this.touch();
    }

    set setCedula(value: string) {
        if (!value || value.trim() === '') {
            throw new Error('La cédula es requerida');
        }
        this._cedula = value;
        this.touch();
    }

    set setAvatar(value: string) { this._avatar = value; this.touch(); }
    set setMiddleName(value: string) { this._middleName = value; this.touch(); }
    set setSecondName(value: string) { this._secondName = value; this.touch(); }
    // set setIdPostalZone(value: string) { this._idPostalZone = value; this.touch(); }

    private validate(): void {
        if (!this._firstName || this._firstName.trim() === '') {
            throw new Error('El nombre es requerido');
        }
        if (!this._lastName || this._lastName.trim() === '') {
            throw new Error('El apellido es requerido');
        }
        if (!this._cedula || this._cedula.trim() === '') {
            throw new Error('La cédula es requerida');
        }
        if (!['Masculino', 'Femenino'].includes(this._gender)) {
            throw new Error('El género debe ser Masculino o Femenino');
        }
    }
}