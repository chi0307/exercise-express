import Route from './route';
import DataController from '../controllers/DataController';

class DataRoute extends Route {
  private dataController = new DataController();

  constructor() {
    super();
    this.setRoute();
  }

  protected setRoute() {
    this.router.get('/', this.dataController.hello);
  }
}

export default DataRoute;
