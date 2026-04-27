import { NotFoundException } from "../../domain/exceptions/notFound.exception";
import { IBaseRepository } from "../../domain/repositories/base.repository";
import { IFindByNamePort } from "../ports/iFindByName.port";


export class FindByNameUseCase <TDomain, TResponse> implements IFindByNamePort<TResponse> {

    constructor(
        private readonly repository: IBaseRepository<TDomain>,
        private readonly resourceName: string,
        private readonly toResponse: (entity: TDomain) => TResponse
    ){}

    async execute(name: string): Promise<TResponse | null> {
        const entity = await this.repository.findByName(name);
        if (!entity) {
            throw new NotFoundException(this.resourceName, name);
        }
        return this.toResponse(entity);
    }

}