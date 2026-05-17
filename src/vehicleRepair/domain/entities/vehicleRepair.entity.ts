import { AuditEntity } from '../../../core/domain/entities/audit.entity';

export class VehicleRepair extends AuditEntity {

    private readonly _id?: string;
    private _name: string;
    private _location: string;
    private _phone?: string;
    private _email?: string;
    private _photo?: string;

    constructor(
        name: string,
        location: string,
        phone?: string,
        email?: string,
        photo?: string,
        id?: string,
        createdAt?: Date,
        updatedAt?: Date,
        active?: boolean
    ) {
        super(createdAt, updatedAt, active);
        this._id = id;
        this._name = name;
        this._location = location;
        this._phone = phone;
        this._email = email;
        this._photo = photo;
        this.validate();
    }

    get getId(): string | undefined { return this._id; }
    get getName(): string { return this._name; }
    get getLocation(): string { return this._location; }
    get getPhone(): string | undefined { return this._phone; }
    get getEmail(): string | undefined { return this._email; }
    get getPhoto(): string | undefined { return this._photo; }

    set setName(value: string) { this._name = value; this.touch(); }
    set setLocation(value: string) { this._location = value; this.touch(); }
    set setPhone(value: string) { this._phone = value; this.touch(); }
    set setEmail(value: string) { this._email = value; this.touch(); }
    set setPhoto(value: string) { this._photo = value; this.touch(); }

    private validate(): void {
        if (!this._name || this._name.trim() === '') throw new Error('El nombre es requerido');
        if (!this._email || !this._email.includes('@'))   throw new Error('El email es inválido');
    }

}