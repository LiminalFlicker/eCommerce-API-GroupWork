import express from 'express';
import { productRouter } from '#routes';
import { connectDB } from '#db';
// import {} from "./middlewares"

const app = express();
const port = 3000;

connectDB();

app.use(express.json());

app.use('/products', productRouter);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('*splat', (req, res) => {
  throw new Error('Not found', { cause: 404 });
});

console.log('Hello World');

app.listen(port, () => console.log(`\x1b[34mMain app listening at http://localhost:${port}\x1b[0m`));
