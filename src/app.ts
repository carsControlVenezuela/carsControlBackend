import express, { Application } from 'express';
import countryRouter from "./config/location/country/infrastructure/http/routers/country.routes";
import { errorHandler } from './core/infrastructure/middlewares/errorHandler.middleware';
import { httpLogger } from './core/infrastructure/logger/morgan.middleware';
import stateRouter from './config/location/state/infrastructure/http/routers/state.route';

const app: Application = express();

app.use(express.json());
app.use(httpLogger);

app.use('/countries', countryRouter);
app.use('/states', stateRouter);

app.use(errorHandler);

export default app;