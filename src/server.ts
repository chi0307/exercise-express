import express from 'express';
let port = 4000;
let app: express.Application = express();

app.get('/:id', function (req, res) {
  let id: Number = parseInt(req.params.id) || 0;
  res.send('Hello World!');
});

app.listen(port, function () {
  console.log(`Example app listening on port ${ port }!`);
});