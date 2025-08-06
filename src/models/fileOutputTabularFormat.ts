import { DirectoryFileEntry, DirectoryFolderEntry } from "src/utils/types";
type Container = [containerID: number,  containerName: string];
type Sort = [sortKey: string, sortOrder:string];

export interface ListDrivesBody {
  containerType: string;
  parentId?: string;
  limit?: number;
  sort: Sort[];
}

export interface ListDrivesResponse {
  containers?: Container[];
  data: object[];
  containerType: string;
  parentId?: string;
}

export interface ListDirectoryContentsBody {
  parentId: string;
  filteroptions?: object[];
  limit?: number;
  sort: Sort[];
}

export interface ListDirectoryContentsResponse {
  parentId: string;
  data: (DirectoryFileEntry | DirectoryFolderEntry)[];
}

export interface ListHeadersBody {
  destinationId: string;
}

export interface ListHeadersResponse {
  headers: string[];
}

export interface ExportToDestinationBody { 
  headers: string[];
  data: string[][];
  destinationId: string;
}

export interface ExportToDestinationResponse {
  success: boolean;

}
