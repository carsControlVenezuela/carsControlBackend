import { AuditEntity } from "../../../../../core/domain/entities/audit.entity";
import { NameCountryException } from "../exceptions/nameCountry.exception";

export class Country extends AuditEntity{
    private _id?: string;
    private _name: string;

    constructor(name: string, id?: string, createdAt?: Date, updatedAt?: Date, active?: boolean) {
        super(createdAt, updatedAt, active);
        this._id = id;
        this._name = name;
        this.validate();
    }

    //Getters

    public get getId(): string | undefined {
        return this._id;
    }

    public get getName(): string {
        return this._name;
    }

    //Setters
    public set setId(value: string) {
        this._id = value;
    }

    public set setName(value: string) {
        if (!value || value.trim() === "") {
            throw new NameCountryException();
        }
        this._name = value;
        this.touch();
    }

    private validate(): void {
        if (!this._name) {
            throw new NameCountryException();
        }
    }

}