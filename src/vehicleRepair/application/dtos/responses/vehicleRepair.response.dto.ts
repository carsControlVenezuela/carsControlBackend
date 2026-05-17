export interface VehicleRepairResponseDto {
    id: string;
    name: string;
    location: string;
    phone?: string;
    email?: string;
    photo?: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}