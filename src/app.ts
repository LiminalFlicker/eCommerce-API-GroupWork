import express from 'express';
import { connectDB } from '#db';
import { errorHandler } from '#middlewares';
import { usersRouter, productRouter } from '#routes';
// import {} from "./routes";
// import '#db';
// import {} from "./middlewares"

// Connect to MongoDB BEFORE starting the server
// Top-level await works because we are using ES modules
await connectDB();
const app = express();
const port = 3000;

app.use(express.json());

app.use('/products', productRouter);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/users', usersRouter);
// app.use('/categories', categoryRouter);

app.use('*splat', (req, res) => {
  throw new Error('Not found', { cause: 404 });
});
console.log('Hello World');

app.use(errorHandler);

app.listen(port, () => console.log(`\x1b[34mMain app listening at http://localhost:${port}\x1b[0m`));
