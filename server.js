const app = require('./app');

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`server runs on 127.0.0.1:${port}`);
});
