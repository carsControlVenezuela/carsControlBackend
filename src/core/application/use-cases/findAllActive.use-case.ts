import { IBaseRepository } from "../../domain/repositories/base.repository";

export class FindAllActiveUseCase<TDomain, TResponse> {
    
    constructor(
        private readonly repository: IBaseRepository<TDomain>,
        private readonly toResponse: (entity: TDomain) => TResponse
    ) {}

    async execute(): Promise<TResponse[]> {
        const entities = await this.repository.findAllActive();
        return entities.map(this.toResponse);
    }
}