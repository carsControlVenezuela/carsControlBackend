import { NotFoundException } from "../../domain/exceptions/notFound.exception";
import { IBaseRepository } from "../../domain/repositories/base.repository";
import { IFindByIdPort } from "../ports/iFindById.port";

export class FindByIdUseCase<TDomain, TResponse> implements IFindByIdPort<TResponse> {

    constructor(
        private readonly repository: IBaseRepository<TDomain>,
        private readonly resourceName: string,
        private readonly toResponse: (entity: TDomain) => TResponse  // ← mapper como función
    ){}

    async execute(id: string): Promise<TResponse> {

        console.log("ENTRO EN EL CASO DE USO")
        const entity = await this.repository.findById(id);
        if (!entity) {
            throw new NotFoundException(this.resourceName, id);
        }
        return this.toResponse(entity);
    }

}