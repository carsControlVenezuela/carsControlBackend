import { AuditEntity } from '../../../core/domain/entities/audit.entity';

export class Role extends AuditEntity {
    private readonly _id?: string;
    private _name: string;
    private _description: string;
    private _permissions: string[];

    constructor(
        name: string,
        description: string,
        permissions: string[] = [],
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
    }

    get getId(): string | undefined { return this._id; }
    get getName(): string { return this._name; }
    get getDescription(): string  { return this._description; }
    get getPermissions(): string[] { return this._permissions; }
}