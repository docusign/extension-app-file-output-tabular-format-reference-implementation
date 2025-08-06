import { Router } from 'express';
import Paths from '../constants/paths';
import authRouter from './auth.controller';
import fileOutputTabularFormatRouter from './fileOutputTabularFormat.controller';

const apiRouter = Router();

apiRouter.use(Paths.FileOutputTabularFormat.Base, fileOutputTabularFormatRouter);

apiRouter.use(Paths.Auth.Base, authRouter);

export default apiRouter;
