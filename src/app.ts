import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import config from './config';
import { UserRoutes } from './app/modules/user/user.route';
import router from './app/routes';
 
const app: Application = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router)
app.get('/', (req: Request, res: Response) => {
    res.send({
        Message: "Ph health care server..",
        enviroment : config.node_env,
        uptime : process.uptime().toFixed(2) + " seconds",
        timeStamp : new Date().toISOString()
    })
});


app.use(globalErrorHandler);

app.use(notFound);

export default app;