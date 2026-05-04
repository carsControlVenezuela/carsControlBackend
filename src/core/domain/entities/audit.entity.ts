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

  //Getters
  get getCreatedAt(): Date { return this._createdAt; }
  get getUpdatedAt(): Date { return this._updatedAt; }
  get getActive(): boolean { return this._active; }
  get getCreatedBy(): string | undefined { return this._createdBy; }
  get getUpdatedBy(): string | undefined { return this._updatedBy; }

  //Setters
  set setActive(value: boolean) { this._active = value; }
  set setUpdatedBy(value: string) { this._updatedBy = value; }

  //Método para actualizar la fecha de actualización
  touch(): void {
    this._updatedAt = new Date();
  }

  //Método para desactivar la entidad
  deactivate(): void {
    this._active = false;
    this._updatedAt = new Date();
  }

  //Método para activar la entidad
  activate(): void {
    this._active = true;
    this._updatedAt = new Date();
  }

  //Método para alternar el estado activo/inactivo  
  toggle(): void {
    this._active = !this._active;
    this._updatedAt = new Date();
  }
}
