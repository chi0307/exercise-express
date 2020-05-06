require('dotenv').config();
import { Request, Response } from 'express';
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LineStrategy } from 'passport-line';

import Route from './route';
import LoginController from '../controllers/LoginController';

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env['FACEBOOK_CLIENT_ID'],
      clientSecret: process.env['FACEBOOK_CLIENT_SECRET'],
      callbackURL: '/login/facebook/callback',
    },
    function (accessToken, refreshToken, profile, callback) {
      return callback(null, profile);
    }
  )
);
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env['GOOGLE_CLIENT_ID'],
      clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
      callbackURL: '/login/google/callback',
    },
    function (accessToken, refreshToken, profile, callback) {
      return callback(null, profile);
    }
  )
);
passport.use(
  new LineStrategy(
    {
      channelID: process.env['LINE_CLIENT_ID'],
      channelSecret: process.env['LINE_CLIENT_SECRET'],
      callbackURL: 'http://localhost/login/line/callback',
    },
    function (accessToken, refreshToken, profile, callback) {
      // User.findOrCreate({ id: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
      return callback(null, profile);
    }
  )
);
passport.serializeUser(function (user, callback) {
  callback(null, user);
});
passport.deserializeUser(function (obj, callback) {
  callback(null, obj);
});

class LoginRoute extends Route {
  private loginController = new LoginController();

  constructor() {
    super();
    this.setRoute();
  }

  protected setRoute() {
    this.router.use(passport.initialize());
    this.router.use(passport.session());
    this.router.get('/login/facebook', passport.authenticate('facebook'));
    this.router.get(
      '/login/facebook/callback',
      passport.authenticate('facebook', { failureRedirect: '/login' }),
      (req: Request, res: Response) => {
        res.redirect('/');
      }
    );
    this.router.get('/login/google', passport.authenticate('google', { scope: ['profile'] }));
    this.router.get(
      '/login/google/callback',
      passport.authenticate('google', { failureRedirect: '/login' }),
      (req: Request, res: Response) => {
        res.redirect('/');
      }
    );
    this.router.get('/login/line', passport.authenticate('line'));
    this.router.get(
      '/login/line/callback',
      passport.authenticate('line', { failureRedirect: '/login' }),
      (req: Request, res: Response) => {
        res.redirect('/');
      }
    );
    this.router.get('/logout', (req: Request, res: Response) => {
      req.logout();
      res.redirect('/');
    });
  }
}

export default LoginRoute;
