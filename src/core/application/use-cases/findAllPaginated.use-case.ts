import { IBaseRepository } from "../../domain/repositories/base.repository";
import { PaginatedResult, PaginationParams } from "../../domain/types/pagination.types";
import { IPaginatedPort } from "../ports/iPaginated.port";

export class FindAllPaginatedUseCase<TDomain, TResponse> implements IPaginatedPort<TResponse>  {
    
    constructor(
        private readonly repository: IBaseRepository<TDomain>,
        private readonly toResponse: (entity: TDomain) => TResponse
    ) {}

    async execute(params: PaginationParams): Promise<PaginatedResult<TResponse>> {

        const result = await this.repository.findAllPaginated(params);

        return {
            ...result,
            data: result.data.map(this.toResponse)
        };

    }
}