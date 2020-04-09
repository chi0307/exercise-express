import Route from './routes/route';
import LoginRoute from './routes/LoginRoute';
import DataRoute from './routes/DataRoute';

export const routers: Array<Route> = [
  new LoginRoute(),
  new DataRoute()
];