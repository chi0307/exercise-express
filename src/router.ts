import Route from './routes/route';
import LoginRoute from './routes/LoginRoute';
import IndexRoute from './routes/IndexRoute';

export const routers: Array<Route> = [new LoginRoute(), new IndexRoute()];
