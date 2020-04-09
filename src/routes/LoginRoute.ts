require('dotenv').config();
import { Request, Response } from 'express';
import passport from 'passport';
import { Strategy } from 'passport-facebook';

import Route from './route';
import LoginController from '../controllers/LoginController';

passport.use(
  new Strategy({
    clientID: process.env['FACEBOOK_CLIENT_ID'],
    clientSecret: process.env['FACEBOOK_CLIENT_SECRET'],
    callbackURL: '/login/facebook/callback'
  },
  function(accessToken, refreshToken, profile, callback) {
    return callback(null, profile);
  })
);
passport.serializeUser(function(user, callback) {
  callback(null, user);
});
passport.deserializeUser(function(obj, callback) {
  callback(null, obj);
});

class LoginRoute extends Route{
  private loginController = new LoginController();

  constructor() {
    super();
    this.setRoute();
  }

  protected setRoute() {
    this.router.use(passport.initialize());
    this.router.use(passport.session());
    this.router.get('/login/facebook', passport.authenticate('facebook'));
    this.router.get('/login/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req: Request, res: Response) => {
      res.redirect('/data/hello');
    });
    this.router.get('/logout', (req: Request, res: Response) => {
      req.logout();
      res.redirect('/data/hello');
    });
  }
}

export default LoginRoute;