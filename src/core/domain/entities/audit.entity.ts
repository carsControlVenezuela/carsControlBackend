export class AuditEntity {
  private _createdAt: Date;
  private _updatedAt: Date;
  private _active: boolean;
  private _createdBy?: string;
  private _updatedBy?: string;

  constructor(
    createdAt?: Date,
    updatedAt?: Date,
    active?: boolean,
    createdBy?: string,
    updatedBy?: string,
  ) {
    this._createdAt = createdAt ?? new Date();
    this._updatedAt = updatedAt ?? new Date();
    this._active = active ?? true;
    this._createdBy = createdBy;
    this._updatedBy = updatedBy;
  }

  get createdAt(): Date {
    return this._createdAt;
  }
  get updatedAt(): Date {
    return this._updatedAt;
  }
  get active(): boolean {
    return this._active;
  }
  get createdBy(): string | undefined {
    return this._createdBy;
  }
  get updatedBy(): string | undefined {
    return this._updatedBy;
  }

  set active(value: boolean) {
    this._active = value;
  }
  set updatedBy(value: string) {
    this._updatedBy = value;
  }

  touch(): void {
    this._updatedAt = new Date();
  }

  deactivate(): void {
    this._active = false;
    this._updatedAt = new Date();
  }

  activate(): void {
    this._active = true;
    this._updatedAt = new Date();
  }

  toggle(): void {
    this._active = !this._active;
    this._updatedAt = new Date();
  }
}
