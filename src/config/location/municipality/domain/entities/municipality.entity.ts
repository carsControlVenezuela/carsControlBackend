import { AuditEntity } from "../../../../../core/domain/entities/audit.entity";
import { NameMunicipalityException } from "../exceptions/nameMunicipality.exception";


export class Municipality extends AuditEntity{

    private _id?: string;
    private _idState: string;
    private _name: string;

    constructor(name: string, idState: string, id?: string, createdAt?: Date, updatedAt?: Date, active?: boolean) {
        super(createdAt, updatedAt, active);
        this._id = id;
        this._idState = idState;
        this._name = name;
        this.validate();
    }

    //Getters

    public get getId(): string | undefined {
        return this._id;
    }

    public get getIdState(): string{
        return this._idState;
    }

    public get getName(): string{
        return this._name;
    }

    //setters

    public set setId(value:string) {
        this._id=value;
    }

    public set setIdState(value:string){
        this._idState=value;
    }

    public set setName(value:string){
        if (!value || value.trim() === "") {
            throw new NameMunicipalityException();
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