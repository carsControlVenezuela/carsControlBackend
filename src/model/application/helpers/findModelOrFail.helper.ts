import { Model } from '../../domain/entities/model.entity';
import { ModelNotFoundException } from '../../domain/exceptions/modelNotFound.exception';
import { IModelRepository } from '../../domain/repositories/iModel.repository';

export async function findModelOrFail(repository: IModelRepository, id: string): Promise<Model> {
  const model = await repository.findById(id);
  if (!model) throw new ModelNotFoundException(id);
  return model;
}
