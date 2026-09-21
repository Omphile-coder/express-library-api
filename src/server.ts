

import express, { Express } from 'express';

import bodyParser from 'body-parser';
import { loggerMiddleware } from './middleware/logger';
import router from './routes/author';

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(bodyParser.json())

app.use(loggerMiddleware)

// http://localhost:3000/v1/authors/
app.use("/v1/authors", router)  




app.listen(PORT, () => { 
    console.log(`server is running on http://localhost:${PORT}`)
})