import Route from './route';
import DataController from '../controllers/DataController';

class DataRoute extends Route{
  private dataController = new DataController();

  constructor() {
    super();
    this.setRoute();
  }

  protected setRoute() {
    this.router.get('/data/hello', this.dataController.hello);
  }
}

export default DataRoute;