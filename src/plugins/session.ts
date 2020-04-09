import express_session from 'express-session';
const MongoStore = require('connect-mongo')(express_session);

const secret: string = 'expree exercise project';
const mongoUrl: string = 'mongodb://localhost:27017';
const dbName: string = 'sessiondb';
const cookieMaxAge: number = 60 * 60 * 1000;

export const session = express_session({
  secret: secret,
  store: new MongoStore({url: `${ mongoUrl }/${ dbName }`}),
  // 強制將session存回 session store, 即使它沒有被修改。(default: true)
  resave: false,
  // 強制將未初始化的(新的且未被修改的)session存回 session store。(default: true)
  saveUninitialized: true,
  cookie: { maxAge: cookieMaxAge },
});