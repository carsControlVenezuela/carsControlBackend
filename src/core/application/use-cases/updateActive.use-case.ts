import { AuditEntity } from "../../domain/entities/audit.entity";
import { IBaseRepository } from "../../domain/repositories/base.repository";
import { findByIdOrFail } from "../helpers/findByIdOrFail.helper";
import { IUpdateActivePort } from "../ports/iUpdateActive.port";

export class UpdateActiveUseCase<TDomain extends AuditEntity> implements IUpdateActivePort {

    constructor(
        private readonly repository: IBaseRepository<TDomain>,
        private readonly resourceName: string,
    ){}

    async execute(id: string): Promise<void>{
        
        const entity = await findByIdOrFail(this.repository, id, this.resourceName);

        entity.toggle();

        await this.repository.update(entity);

    }

}