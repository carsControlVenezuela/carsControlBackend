import { AuditEntity } from '../../../core/domain/entities/audit.entity';

export class Permission extends AuditEntity {

    private readonly _id?: string;
    private _name: string;
    private _resource: string;
    private _action: string;
    private _description: string;

    constructor(
        name: string,
        resource: string,
        action: string,
        description: string,
        id?: string,
        createdAt?: Date,
        updatedAt?: Date,
        active?: boolean
    ) {
        super(createdAt, updatedAt, active);
        this._id = id;
        this._name = name;
        this._resource = resource;
        this._action = action;
        this._description = description;
        this.validate();
    }

    get getId(): string | undefined  { return this._id; }
    get getName(): string { return this._name; }
    get getResource(): string { return this._resource; }
    get getAction(): string { return this._action; }
    get getDescription(): string { return this._description; }

    set setName(value: string) { this._name = value; this.touch(); }
    set setResource(value: string) { this._resource = value; this.touch(); }
    set setAction(value: string) { this._action = value; this.touch(); }
    set setDescription(value: string) { this._description = value; this.touch(); }

    private validate(): void {
        if (!this._name || this._name.trim() === '') throw new Error('El nombre es requerido');
        if (!this._resource || this._resource.trim() === '') throw new Error('El recurso es requerido');
        if (!this._action || this._action.trim() === '') throw new Error('La acción es requerida');
        if (!this._description || this._description.trim() === '') throw new Error('La descripción es requerida');
    }
}