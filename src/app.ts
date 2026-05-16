import express, { Application } from 'express';
import countryRouter from "./config/location/country/infrastructure/http/routers/country.routes";
import { errorHandler } from './core/infrastructure/middlewares/errorHandler.middleware';
import { httpLogger } from './core/infrastructure/logger/morgan.middleware';
import stateRouter from './config/location/state/infrastructure/http/routers/state.route';
import authRouter from './auth/infrastructure/http/routers/auth.route';
import { authenticate } from './auth/infrastructure/middlewares/authenticate.middleware';
import ParishRouter from './config/location/parish/infrastructure/http/routers/state.route';

const app: Application = express();

app.use(express.json());
app.use(httpLogger);

app.use('/auth', authRouter);

//authenticate global: Significa que authenticate se ejecuta antes de cualquier ruta de cualquier módulo.
app.use('/countries', authenticate, countryRouter);
app.use('/states', authenticate,stateRouter);
app.use('/parishes', ParishRouter);

app.use(errorHandler);

export default app;
