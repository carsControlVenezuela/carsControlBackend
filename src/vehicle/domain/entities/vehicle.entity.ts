import { AuditEntity } from '../../../core/domain/entities/audit.entity';
import { v4 as uuidv4 } from 'uuid';

export class Vehicle extends AuditEntity {
  private _id: string;
  private _idPerson: string;
  private _idModel: string;
  private _year: Date;
  private _color: string;
  private _purchaseDate: Date;
  private _plate: string;
  private _mileage: number;

  constructor(
    idPerson: string,
    idModel: string,
    year: Date,
    color: string,
    purchaseDate: Date,
    plate: string,
    mileage: number,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
    active?: boolean,
    createdBy?: string,
    updatedBy?: string,
  ) {
    super(createdAt, updatedAt, active, createdBy, updatedBy);
    this._id = id ?? uuidv4();
    this._idPerson = idPerson;
    this._idModel = idModel;
    this._year = year;
    this._color = color;
    this._purchaseDate = purchaseDate;
    this._plate = plate;
    this._mileage = mileage;
  }

  get id(): string {
    return this._id;
  }

  get idPerson(): string {
    return this._idPerson;
  }

  get idModel(): string {
    return this._idModel;
  }

  get year(): Date {
    return this._year;
  }

  get color(): string {
    return this._color;
  }

  get purchaseDate(): Date {
    return this._purchaseDate;
  }

  get plate(): string {
    return this._plate;
  }

  get mileage(): number {
    return this._mileage;
  }

  set color(value: string) {
    this._color = value;
    this.touch();
  }

  set mileage(value: number) {
    this._mileage = value;
    this.touch();
  }

  set plate(value: string) {
    this._plate = value;
    this.touch();
  }
}