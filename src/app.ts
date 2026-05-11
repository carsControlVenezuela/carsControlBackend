import express, { Application } from 'express';
import countryRouter from './config/location/country/infrastructure/http/routers/country.routes';
import { errorHandler } from './core/infrastructure/middlewares/errorHandler.middleware';
import { httpLogger } from './core/infrastructure/logger/morgan.middleware';
import stateRouter from './config/location/state/infrastructure/http/routers/state.route';
import authRouter from './auth/infrastructure/http/routers/auth.route';
import { authenticate } from './auth/infrastructure/middlewares/authenticate.middleware';
import ParishRouter from './config/location/parish/infrastructure/http/routers/state.route';
import personRouter from './person/infrastructure/http/routers/person.route';
import brandRouter from './config/vehicle/brand/infrastructure/http/routers/brand.route';
import modelRouter from './config/vehicle/model/infrastructure/http/routers/model.route';
import vehicleRouter from './vehicle/infrastructure/http/routers/vehicle.route';
import roleRouter from './role/infrastructure/http/routers/role.route';
import permissionRouter from './permission/infrastructure/http/routers/permission.route';


const app: Application = express();

app.use(express.json());
app.use(httpLogger);

app.use('/auth', authRouter);

//authenticate global: Significa que authenticate se ejecuta antes de cualquier ruta de cualquier módulo.
app.use('/roles', roleRouter);
app.use('/permissions', permissionRouter);
app.use('/countries', authenticate, countryRouter);
app.use('/states', authenticate, stateRouter);
app.use('/parishes', ParishRouter);
app.use('/persons', personRouter);

app.use('/api/v1/brands', brandRouter);
app.use('/api/v1/models', modelRouter);
app.use('/api/v1/vehicles', vehicleRouter);

app.use(errorHandler);

export default app;
