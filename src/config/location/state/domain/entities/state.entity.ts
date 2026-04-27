import { AuditEntity } from "../../../../../core/domain/entities/audit.entity";
import { NameStateException } from "../exceptions/nameState.exception";

export class State extends AuditEntity{

    private _id?: string;
    private _idCountry: string;
    private _name: string;

    constructor(name: string, idCountry: string, id?: string, createdAt?: Date, updatedAt?: Date, active?: boolean) {
        super(createdAt, updatedAt, active);
        this._id = id;
        this._idCountry = idCountry;
        this._name = name;
        this.validate();
    }

    //Getters

    public get getId(): string | undefined {
        return this._id;
    }

    public get getIdCountry(): string{
        return this._idCountry;
    }

    public get getName(): string {
        return this._name;
    }

    //Setters
    public set setId(value: string) {
        this._id = value;
    }

    public set setIdCountry(value: string) {
        this._idCountry = value;
    }

    public set setName(value: string) {
        if (!value || value.trim() === "") {
            throw new NameStateException();
        }
        this._name = value;
        this.touch();
    }

    private validate(): void {
        if (!this._name) {
            throw new Error("Name of the state cannot be empty.");
        }
    }
}