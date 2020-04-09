import { Request, Response } from 'express';

class DataController {
  hello(req: Request, res: Response) {
    let user: any = req.user;
    let name = user && user.displayName || 'world';
    console.log(user)
    res.send(`Hello ${ name }!!`);
  }
}

export default DataController;