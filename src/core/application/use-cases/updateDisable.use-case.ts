import { AuditEntity } from "../../domain/entities/audit.entity";
import { IBaseRepository } from "../../domain/repositories/base.repository";
import { findByIdOrFail } from "../helpers/findByIdOrFail.helper";

import { IUpdateDisablePort } from "../ports/iUpdateDisable.port";

export class UpdateDisableUseCase<TDomain extends AuditEntity> implements IUpdateDisablePort {

    constructor(
        private readonly repository: IBaseRepository<TDomain>,
        private readonly resourceName: string,
    ){}

    async execute(id: string): Promise<void>{

        const entity = await findByIdOrFail(this.repository, id, this.resourceName);

        entity.deactivate();

        await this.repository.update(entity);

    }

}