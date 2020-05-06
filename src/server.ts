import express from 'express';
import { routers } from './router';
import { session } from './plugins/session';

const port = 80;
let app: express.Application = express();
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(session);

for (const router of routers) {
  app.use(router.getRouter());
}

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
