import express, { Request, Response } from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import NotFound from './middlewares/NotFound';
import path from 'path';
import router from './routes/routes';
const app = express();

export const corsOptions = {
  origin: ['http://localhost:3000', 'https://inventory-softwere.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

//middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use('/api', router);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

//test route
const test = async (req: Request, res: Response) => {
  const sayHi = 'Hi world!';
  res.send(sayHi);
};
app.get('/', test);
//gloabal err handler
app.use(globalErrorHandler);

//Not Found Route
app.use(NotFound);
export default app;
