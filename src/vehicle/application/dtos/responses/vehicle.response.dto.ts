export interface VehicleResponseDto {
  id: string;
  idPerson: string;
  idModel: string;
  year: Date;
  color: string;
  purchaseDate: Date;
  plate: string;
  mileage: number;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}