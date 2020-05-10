import { Request, Response } from 'express';

class IndexController {
  index(req: Request, res: Response) {
    let user: any = req.user;
    let name = (user && user.displayName) || 'world';
    let view = `Hello ${name}!!`;
    if (user) {
      delete user._raw;
      delete user._json;
      view += `<br/><br/><textarea rows="25" style="width: 100%">${JSON.stringify(user, null, 4)}</textarea>`;
      view += '<br/><br/><a href="http://localhost/logout">logout</a>';
    } else {
      view += '<br/><br/><a href="http://localhost/login/facebook">facebook login</a>';
      view += '<br/><a href="http://localhost/login/google">google login</a>';
      view += '<br/><a href="http://localhost/login/line">line login</a>';
    }
    res.send(view);
  }
}

export default IndexController;
