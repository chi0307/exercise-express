import { Request, Response } from 'express';

class DataController {
  hello(req: Request, res: Response) {
    let text: String = req.params.text;
    res.send(`Hello ${ text }!!`);
  }
}

export default DataController;