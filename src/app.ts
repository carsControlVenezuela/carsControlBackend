import express, { Application } from 'express';
import { httpLogger } from './core/infrastructure/logger/morgan.middleware';
import countryRouter from './config/location/country/infrastructure/http/routers/country.routes';
import stateRouter from './config/location/state/infrastructure/http/routers/state.route';
import { errorHandler } from './middlewares/errorHandler.middleware';

const app: Application = express();

app.use(express.json());
app.use(httpLogger);

app.use('/api/countries', countryRouter);
app.use('/api/states', stateRouter);

app.use(errorHandler);

export default app;