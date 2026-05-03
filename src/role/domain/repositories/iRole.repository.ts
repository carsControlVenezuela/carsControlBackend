import { IBaseRepository } from "../../../core/domain/repositories/base.repository";
import { Role } from "../entities/role.entity";

export interface IRoleRepository extends IBaseRepository<Role> {}