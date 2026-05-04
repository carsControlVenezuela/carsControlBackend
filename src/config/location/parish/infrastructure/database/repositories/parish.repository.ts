import { DeepPartial, Repository } from "typeorm";
import { BaseTypeormRepository } from "../../../../../../core/infrastructure/database/repositories/base.repository";
import { Parish } from "../../../domain/entities/parish.entity";
import { ParishEntity } from "../psql/typeorm/entities/parish.typeorm.entity";
import { IParishRepository } from "../../../domain/repositories/iParish.repository";
import { ParishTypeormMapper } from "../../http/mappers/parish.http.mapper";

export class ParishRepository extends BaseTypeormRepository<Parish, ParishEntity> implements IParishRepository{

    constructor(repo: Repository<ParishEntity>) {
        super(repo); 
    }

    protected toDomain(entity: ParishEntity): Parish {
        return ParishTypeormMapper.toDomain(entity);
    }

    protected toPersistence(Parish: Parish): DeepPartial<ParishEntity> {
        return ParishTypeormMapper.toPersistence(Parish);
    }

    protected getRelations(): string[] {
        return ['municipality']; // exclusivo de Parish
    }
    
    async save(Parish: Parish): Promise<void> {
        
        await this.repo.save(this.repo.create(ParishTypeormMapper.toPersistence(Parish)));
  
    }

    async findAllByKeywords(name: string): Promise<Parish[]> {

        const entities = await this.repo
            .createQueryBuilder('Parish')
            .innerJoinAndSelect('Parish.municipality', 'municipality')
            .where('LOWER(Parish.name) LIKE LOWER(:name)', { name: `%${name}%` })
            .getMany();

        return entities.map(ParishTypeormMapper.toDomain);
    }
    
}