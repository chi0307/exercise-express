import express from 'express';
import { routers } from './router';

const port = 4000;
let app: express.Application = express();

for(const router of routers) {
  app.use(router.getRouter());
}

app.listen(port, function () {
  console.log(`Example app listening on port ${ port }!`);
});