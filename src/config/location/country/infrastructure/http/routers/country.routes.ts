import { Router } from "express";
import { CountryRepository } from "../../database/repositories/country.repository";
import { CreateCountryUseCase } from "../../../application/uses-cases/createCountry.use-case-";
import { AppDataSource } from "../../../../../../database/typeorm/typeorm.config";
import { CreateCountryController } from "../controllers/createCountry.controller";
import { validateDto } from "../../../../../../middlewares/validateDto.middleware";
import { CountryRequestDTO } from "../dtos/requests/country.request.dto";
import { UpdateCountryUseCase } from "../../../application/uses-cases/updateCountry.use-case";
import { UpdateCountryController } from "../controllers/updateCountry.controller";
import { GetAllCountriesByKeywordsUseCase } from "../../../application/uses-cases/getAllCountriesByKeywords.use-case";
import { GetAllCountriesByKeywordsController } from "../controllers/getAllCountriesByKeywords.controller";
import { CountryEntity } from "../../database/psql/typeorm/entities/country.typeorm.entity";
import { FindByIdUseCase } from "../../../../../../core/application/use-cases/findById.use-case";
import { CountryMapper } from "../../../application/mappers/country.mapper";
import { FindByIdController } from "../../../../../../core/infrastructure/controllers/findById.controller";
import { FindAllUseCase } from "../../../../../../core/application/use-cases/findAll.use-case";
import { FindAllActiveUseCase } from "../../../../../../core/application/use-cases/findAllActive.use-case";
import { FindByNameUseCase } from "../../../../../../core/application/use-cases/findByName.use-case";
import { UpdateActiveUseCase } from "../../../../../../core/application/use-cases/updateActive.use-case";
import { UpdateDisableUseCase } from "../../../../../../core/application/use-cases/updateDisable.use-case";
import { FindAllController } from "../../../../../../core/infrastructure/controllers/findAll.controller";
import { FindAllActiveController } from "../../../../../../core/infrastructure/controllers/findAllActive.controller";
import { FindByNameController } from "../../../../../../core/infrastructure/controllers/findByName.controller";
import { UpdateActiveController } from "../../../../../../core/infrastructure/controllers/updateActive.controller";
import { UpdateDisableController } from "../../../../../../core/infrastructure/controllers/updateDisable.controller";


const countryRouter = Router();

const countryTypeormRepo = AppDataSource.getRepository(CountryEntity);

const repository = new CountryRepository(countryTypeormRepo);

//USE-CASES
const createUseCase = new CreateCountryUseCase(repository);
const getByIdUseCase = new FindByIdUseCase(repository, "País", CountryMapper.toResponse)
const getAllUseCase = new FindAllUseCase(repository, CountryMapper.toResponse);
const getAllActive = new FindAllActiveUseCase(repository, CountryMapper.toResponse);
const getByNameUseCase = new FindByNameUseCase(repository, "País", CountryMapper.toResponse);
const getAllCountriesByKeywordsUseCase = new GetAllCountriesByKeywordsUseCase(repository);
const updateUseCase = new UpdateCountryUseCase(repository);
const updateActiveUseCase = new UpdateActiveUseCase(repository, "País");
const updateDisableUseCase = new UpdateDisableUseCase(repository, "País");



//CONTROLLERS
const createCountryController = new CreateCountryController(createUseCase);
const getCountryByIdController = new FindByIdController(getByIdUseCase);
const getAllCountriesController = new FindAllController(getAllUseCase);
const getAllCountriesActiveController = new FindAllActiveController(getAllActive);
const getCountryByNameController = new FindByNameController(getByNameUseCase);
const getAllCountriesByKeywordsController = new GetAllCountriesByKeywordsController(getAllCountriesByKeywordsUseCase);
const updateCountryController = new UpdateCountryController(updateUseCase);
const updateActiveController = new UpdateActiveController(updateActiveUseCase);
const updateDisableController = new UpdateDisableController(updateDisableUseCase);


//ROUTES
countryRouter.post('/', validateDto(CountryRequestDTO), createCountryController.create);
countryRouter.get('/', getAllCountriesController.getAll);
countryRouter.get('/active', getAllCountriesActiveController.getAllActive);

countryRouter.get('/name/:name', getCountryByNameController.getByName);
countryRouter.get('/search/:keyword', getAllCountriesByKeywordsController.search);

countryRouter.get('/:id', getCountryByIdController.getById);
countryRouter.put('/:id', validateDto(CountryRequestDTO), updateCountryController.updateCountry);
countryRouter.patch('/:id/toggle', updateActiveController.updateActive);
countryRouter.patch('/:id/disable', updateDisableController.updateDisable);

export default countryRouter;