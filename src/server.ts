import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { loggerMiddleware } from './middleware/logger';
import authorRouter from './routes/author'; 
import bookRouter from './routes/book';     
import { notFoundHandler } from './middleware/error';

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());

app.use(loggerMiddleware);

// API Routes
app.use("/v1/authors", authorRouter);
app.use("/v1/books", bookRouter); 

// 404 Handler must come after routes
app.use(notFoundHandler);

app.listen(PORT, () => { 
    console.log(`server is running on http://localhost:${PORT}`);
});