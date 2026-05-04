import { NotFoundException } from "../../domain/exceptions/notFound.exception";
import { IBaseRepository } from "../../domain/repositories/base.repository";

export async function findByIdOrFail<T>(repository: IBaseRepository<T>, id: string, resourceName: string): Promise<T> {

    const entity = await repository.findById(id);
    
    if (!entity) throw new NotFoundException(resourceName, id);

    return entity;

}