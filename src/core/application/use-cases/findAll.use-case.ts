import { IBaseRepository } from "../../domain/repositories/base.repository";

export class FindAllUseCase<TDomain, TResponse> {
    constructor(
        private readonly repository: IBaseRepository<TDomain>,
        private readonly toResponse: (entity: TDomain) => TResponse
    ) {}

    async execute(): Promise<TResponse[]> {
        const entities = await this.repository.findAll();
        return entities.map(this.toResponse);
    }
}