import { PaginatedResult, PaginationParams } from "../../domain/types/pagination.types";

export interface IPaginatedPort<TResponse> {
    execute(params: PaginationParams): Promise<PaginatedResult<TResponse>>;
}