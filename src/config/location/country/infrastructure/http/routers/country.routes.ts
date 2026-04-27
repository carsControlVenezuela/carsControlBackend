import { Router } from "express";
import { CountryRepository } from "../../database/repositories/country.repository";
import { CreateCountryUseCase } from "../../../application/uses-cases/createCountry.use-case-";
import { AppDataSource } from "../../../../../../database/typeorm/typeorm.config";
import { CreateCountryController } from "../controllers/createCountry.controller";
import { GetCountryByIdUseCase } from "../../../application/uses-cases/getCountryById.use-case";
import { GetCountryByIdController } from "../controllers/getCountryById.controller";
import { validateDto } from "../../../../../../middlewares/validateDto.middleware";
import { CountryRequestDTO } from "../dtos/requests/country.request.dto";
import { GetAllCountriesUseCase } from "../../../application/uses-cases/getAllCountries.use-case";
import { GetAllCountriesController } from "../controllers/getAllCountries.controllers";
import { UpdateCountryUseCase } from "../../../application/uses-cases/updateCountry.use-case";
import { UpdateCountryController } from "../controllers/updateCountry.controller";
import { GetCountryByNameUseCase } from "../../../application/uses-cases/getCountryByName.use-case";
import { GetCountryByNameController } from "../controllers/getCountryByName.controller";
import { GetAllCountriesByKeywordsUseCase } from "../../../application/uses-cases/getAllCountriesByKeywords.use-case";
import { GetAllCountriesByKeywordsController } from "../controllers/getAllCountriesByKeywords.controller";
import { GetAllCountriesActiveUseCase } from "../../../application/uses-cases/getAllCountriesActive.use-case";
import { UpdateCountryActiveUseCase } from "../../../application/uses-cases/updateCountryActive.use-case";
import { UpdateCountryDisableUseCase } from "../../../application/uses-cases/updateCountryDisable.use-case";
import { GetAllCountriesActiveController } from "../controllers/getAllCountriesActive.controller";
import { UpdateCountryActiveController } from "../controllers/updateCountryActive.controller";
import { UpdateCountryDisableController } from "../controllers/updateCountryDisable.controller";


const countryRouter = Router();

const repository = new CountryRepository(AppDataSource);

//USE-CASES
const createUseCase = new CreateCountryUseCase(repository);
const getByIdUseCase = new GetCountryByIdUseCase(repository)
const getAllUseCase = new GetAllCountriesUseCase(repository);
const getAllActive = new GetAllCountriesActiveUseCase(repository);
const getByNameUseCase = new GetCountryByNameUseCase(repository);
const getAllCountriesByKeywordsUseCase = new GetAllCountriesByKeywordsUseCase(repository);
const updateUseCase = new UpdateCountryUseCase(repository);
const updateActiveUseCase = new UpdateCountryActiveUseCase(repository);
const updateDisableUseCase = new UpdateCountryDisableUseCase(repository);



//CONTROLLERS
const createCountryController = new CreateCountryController(createUseCase);
const getCountryByIdController = new GetCountryByIdController(getByIdUseCase);
const getAllCountriesController = new GetAllCountriesController(getAllUseCase);
const getAllCountriesActiveController = new GetAllCountriesActiveController(getAllActive);
const getCountryByNameController = new GetCountryByNameController(getByNameUseCase);
const getAllCountriesByKeywordsController = new GetAllCountriesByKeywordsController(getAllCountriesByKeywordsUseCase);
const updateCountryController = new UpdateCountryController(updateUseCase);
const updateActiveController = new UpdateCountryActiveController(updateActiveUseCase);
const updateDisableController = new UpdateCountryDisableController(updateDisableUseCase);


//ROUTES
countryRouter.post('/', validateDto(CountryRequestDTO), createCountryController.create);
countryRouter.get('/', getAllCountriesController.getAll);
countryRouter.get('/active', getAllCountriesActiveController.getAllCountriesActive);

countryRouter.get('/name/:name', getCountryByNameController.getCountryByName);
countryRouter.get('/search/:keyword', getAllCountriesByKeywordsController.search);

countryRouter.get('/:id', getCountryByIdController.getCountryById);
countryRouter.put('/:id', validateDto(CountryRequestDTO), updateCountryController.updateCountry);
countryRouter.patch('/:id/active', updateActiveController.updateCountryActive);
countryRouter.patch('/:id/disable', updateDisableController.updateCountryDisable);

export default countryRouter;