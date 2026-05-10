import { v4 as uuidv4 } from 'uuid';

import { AuditEntity } from '../../../core/domain/entities/audit.entity';

export class Brand extends AuditEntity {
  private _id: string;
  private _name: string;

  constructor(
    name: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
    active?: boolean,
    createdBy?: string,
    updatedBy?: string,
  ) {
    super(createdAt, updatedAt, active, createdBy, updatedBy);
    this._id = id ?? uuidv4();
    this._name = name;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
    this.touch();
  }
}