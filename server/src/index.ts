import express from 'express';

const port = 3000;
const app = express();

app.get('/', (_req, res) => {
  res.send('こんにちは');
});
// app.get('/', (_, res) => {
//   res.send('Hello world');
// });

// app.listen(3001, () => console.log('Server is running'));
app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}/`);
});
