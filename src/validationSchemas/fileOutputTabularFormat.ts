import { Schema } from 'express-validator';

export const fileOutputTabularFormatExportToDestinationBody: Schema = {
  headers: { isArray: true, optional: true },
  data: { isArray: true },
  destinationId: { isString: true },
};

export const fileOutputTabularFormatListHeadersBody: Schema = {
  destinationId: { isString: true },    
};

export const fileOutputTabularFormatListDrivesBody: Schema = {
  containerType: { isString: true },
  parentId: { isString: true, optional: true },
  limit: { isInt: true, optional: true },
  sort: { isArray: true, optional: true },
};

export const fileOutputTabularFormatListDirectoryContentsBody: Schema = {
  parentId: { isString: true },
  filteroptions: { isArray: true, optional: true },
  limit: { isInt: true, optional: true },
  sort: { isArray: true, optional: true },
};
