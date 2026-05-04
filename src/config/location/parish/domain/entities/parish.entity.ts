import { AuditEntity } from "../../../../../core/domain/entities/audit.entity";
import { NameParishException } from "../exceptions/nameParish.exception";


export class Parish extends AuditEntity{

    private _id?: string;
    private _idMunicipality: string;
    private _name: string;

    constructor(name: string, idMunicipality: string, id?: string, createdAt?: Date, updatedAt?: Date, active?: boolean) {
        super(createdAt, updatedAt, active);
        this._id = id;
        this._idMunicipality = idMunicipality;
        this._name = name;
        this.validate();
    }

    //Getters

    public get getId(): string | undefined {
        return this._id;
    }

    public get getIdMunicipality(): string{
        return this._idMunicipality;
    }

    public get getName(): string{
        return this._name;
    }

    //setters

    public set setId(value:string) {
        this._id=value;
    }

    public set setIdMunicipality(value:string){
        this._idMunicipality=value;
    }

    public set setName(value:string){
        if (!value || value.trim() === "") {
            throw new NameParishException();
        }
        this._name=value;
        this.touch();
    }

    private validate(): void {
        if (!this._name) {
            throw new Error("Name of the state cannot be empty.");
        }
    }   
}