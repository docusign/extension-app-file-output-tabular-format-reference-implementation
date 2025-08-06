import * as e from 'express';
import { Query } from 'express-serve-static-core';

export interface IReq<T = void> extends e.Request {
  body: T;
}

export interface IReqQuery<T extends Query, U = void> extends e.Request {
  query: T;
  body: U;
}

export interface IRes extends e.Response {}

export type Immutable<T> = {
  readonly [K in keyof T]: Immutable<T[K]>;
};

export enum DirectoryEntryTypes {
  file = 'file',
  folder = 'folder',
}

export type DirectoryFileEntry = {
  type: DirectoryEntryTypes.file;
  name: string;
  id: string;
  parentId: string;
  parentName?: string;
  mimeType: string;
  lastModifiedDate: string;
  version?: string;
  sizeInBytes?: number;
};

export type DirectoryFolderEntry = {
  type: DirectoryEntryTypes.folder;
  name: string;
  parentId: string;
  parentName?: string;
  id: string;
};
