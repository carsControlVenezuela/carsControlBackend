import { AuditEntity } from '../../../core/domain/entities/audit.entity';
import { Permission } from '../../../permission/domain/entities/permission.entity';

export class Role extends AuditEntity {
    private readonly _id?: string;
    private _name: string;
    private _description: string;
    private _permissions: Permission[];

    constructor(
        name: string,
        description: string,
        permissions: Permission[] = [],
        id?: string,
        createdAt?: Date,
        updatedAt?: Date,
        active?: boolean
    ) {
        super(createdAt, updatedAt, active);
        this._id = id;
        this._name = name;
        this._description = description;
        this._permissions = permissions;
        this.validate();
    }

    get getId(): string | undefined { return this._id; }
    get getName(): string { return this._name; }
    get getDescription(): string  { return this._description; }
    get getPermissions(): Permission[] { return this._permissions; }

    set setName(value: string) { this._name = value; this.touch(); }
    set setDescription(value: string) { this._description = value; this.touch(); }
    set setPermissions(values: Permission[]) { this._permissions = values; this.touch(); }

    private validate(): void {
        if (!this._name || this._name.trim() === '') throw new Error('El nombre es requerido');
        if (!this._description || this._description.trim() === '') throw new Error('La descripción es requerida');
    }
}