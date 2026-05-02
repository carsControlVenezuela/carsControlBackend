import express, { Application } from 'express';
/* import countryRouter from "./config/location/country/infrastructure/http/routers/country.routes";
import { errorHandler } from './middlewares/errorHandler.middleware';
import { httpLogger } from './core/infrastructure/logger/morgan.middleware';
 */
const app: Application = express();

app.use(express.json());
/* app.use(httpLogger);

app.use('/api/country', countryRouter);

app.use(errorHandler); */

export default app;
