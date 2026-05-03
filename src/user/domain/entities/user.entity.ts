import { AuditEntity } from '../../../core/domain/entities/audit.entity';

export class User extends AuditEntity {
    private readonly _id?: string;
    private _email: string;
    private _password: string;
    private _roles: string[];
    private _permissions: string[];


    constructor(
        email: string,
        password: string,
        roles: string[] = [],
        permissions: string[] = [],
        id?: string,
        createdAt?: Date,
        updatedAt?: Date,
        active?: boolean
    ) {
        super(createdAt, updatedAt, active);
        this._id = id;
        this._email = email;
        this._password = password;
        this._roles = roles;
        this._permissions = permissions;
        this.validate();
    }

    get getId(): string | undefined { 
        return this._id; 
    }
    get getEmail(): string { 
        return this._email; 
    }
    get getPassword(): string { 
        return this._password; 
    }
    get getRoles(): string[] { 
        return this._roles; 
    }
    get getPermissions(): string[] { 
        return this._permissions; 
    }

    set setPassword(value: string) { 
        this._password = value; 
    }

    private validate(): void {
        if (!this._email || !this._email.includes('@')) {
            throw new Error('Email inválido');
        }
        if (!this._password || this._password.length < 6) {
            throw new Error('Password debe tener al menos 6 caracteres');
        }
    }
}