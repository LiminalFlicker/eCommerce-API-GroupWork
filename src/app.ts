import express from 'express';
import { connectDB } from '#db';

import { usersRouter } from '#routes';
// import {} from "./routes";
// import '#db';
// import {} from "./middlewares"

// Connect to MongoDB BEFORE starting the server
// Top-level await works because we are using ES modules
await connectDB();
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/users', usersRouter);

console.log('Hello World');

app.listen(port, () => console.log(`\x1b[34mMain app listening at http://localhost:${port}\x1b[0m`));
