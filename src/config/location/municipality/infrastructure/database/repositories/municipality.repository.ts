import { DeepPartial, Repository } from "typeorm";
import { BaseTypeormRepository } from "../../../../../../core/infrastructure/database/repositories/base.repository";
import { Municipality } from "../../../domain/entities/municipality.entity";
import { MunicipalityEntity } from "../psql/typeorm/entities/municipality.typeorm.entity";
import { IMunicipalityRepository } from "../../../domain/repositories/iMunicipality.repository";
import { MunicipalityTypeormMapper } from "../../http/mappers/municipality.http.mapper";

export class MunicipalityRepository extends BaseTypeormRepository<Municipality, MunicipalityEntity> implements IMunicipalityRepository{

    constructor(repo: Repository<MunicipalityEntity>) {
        super(repo); 
    }

    protected toDomain(entity: MunicipalityEntity): Municipality {
        return MunicipalityTypeormMapper.toDomain(entity);
    }

    protected toPersistence(Municipality: Municipality): DeepPartial<MunicipalityEntity> {
        return MunicipalityTypeormMapper.toPersistence(Municipality);
    }

    protected getRelations(): string[] {
        return ['state']; // exclusivo de Municipality
    }
    
    async save(Municipality: Municipality): Promise<void> {
        
        await this.repo.save(this.repo.create(MunicipalityTypeormMapper.toPersistence(Municipality)));
  
    }

    async findAllByKeywords(name: string): Promise<Municipality[]> {

        const entities = await this.repo
            .createQueryBuilder('Municipality')
            .innerJoinAndSelect('Municipality.state', 'state')
            .where('LOWER(Municipality.name) LIKE LOWER(:name)', { name: `%${name}%` })
            .getMany();

        return entities.map(MunicipalityTypeormMapper.toDomain);
    }
    
}