import Route from './route';
import IndexController from '../controllers/IndexController';

class IndexRoute extends Route {
  private indexController = new IndexController();

  constructor() {
    super();
    this.setRoute();
  }

  protected setRoute() {
    this.router.get('/', this.indexController.index);
  }
}

export default IndexRoute;
