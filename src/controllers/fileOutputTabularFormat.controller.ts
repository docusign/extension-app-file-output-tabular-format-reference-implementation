import { Router } from 'express';

import Paths from '../constants/paths';
import { listHeaders, listDirectoryContents, listDrives, exportToDestination } from '../services/fileOutputTabularFormat.service';
import { expressjwt as jwt } from 'express-jwt';
import { checkSchema } from 'express-validator';
import { fileOutputTabularFormatListHeadersBody, fileOutputTabularFormatExportToDestinationBody, fileOutputTabularFormatListDirectoryContentsBody, fileOutputTabularFormatListDrivesBody } from '../validationSchemas/fileOutputTabularFormat';
import checkValidationErrors from '../middleware/checkValidationErrors';
import env from '../env';

const fileOutputTabularFormatRouter = Router();

fileOutputTabularFormatRouter.post(
  Paths.FileOutputTabularFormat.ListHeaders.Post,
  jwt({
    secret: env.JWT_SECRET_KEY,
    algorithms: ['HS256'],
  }),
  checkSchema(fileOutputTabularFormatListHeadersBody, ['body']),
  checkValidationErrors,
  listHeaders,
);

fileOutputTabularFormatRouter.post(
  Paths.FileOutputTabularFormat.ExportToDestination.Post,
  jwt({
    secret: env.JWT_SECRET_KEY,
    algorithms: ['HS256'],
  }),
  checkSchema(fileOutputTabularFormatExportToDestinationBody, ['body']),
  checkValidationErrors,
  exportToDestination,
);

fileOutputTabularFormatRouter.post(
  Paths.FileOutputTabularFormat.FileIOListDirectoryContents.Post,
  jwt({
    secret: env.JWT_SECRET_KEY,
    algorithms: ['HS256'],
  }),
  checkSchema(fileOutputTabularFormatListDirectoryContentsBody, ['body']),
  checkValidationErrors,
  listDirectoryContents,
);

fileOutputTabularFormatRouter.post(
  Paths.FileOutputTabularFormat.FileIOListDrives.Post,
  jwt({
    secret: env.JWT_SECRET_KEY,
    algorithms: ['HS256'],
  }),
  checkSchema(fileOutputTabularFormatListDrivesBody, ['body']),
  checkValidationErrors,
  listDrives,
);

export default fileOutputTabularFormatRouter;
