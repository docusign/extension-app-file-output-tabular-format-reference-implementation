import { ListDirectoryContentsBody, ListDirectoryContentsResponse, ListDrivesBody, ListDrivesResponse, ListHeadersBody , ListHeadersResponse, ExportToDestinationBody, ExportToDestinationResponse } from '../models/fileOutputTabularFormat';
import { DirectoryEntryTypes, IReq, IRes } from '../utils/types';

enum ErrorCode {
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  BAD_REQUEST = 'BAD_REQUEST',
}

type ErrorResponse = {
  message: string;
  code: string;
}

const IDENTIFIER: string = 'Id';

export const listDirectoryContents = (req: IReq<ListDirectoryContentsBody>, res: IRes) => {
     const {
     body: {
      parentId: reqParentId,
    },
  } = req;
  
  try {
  const mockdata = [
    { 
      type: DirectoryEntryTypes.file,
      name: "sample_google_sheet1",
      id: "sample_google_sheet1_id",
      mimeType: "application/vnd.google-apps.spreadsheet",
      parentId: reqParentId,
      lastModifiedDate: "2025-08-30T11:01:54.344Z"
    },
    { 
      type: DirectoryEntryTypes.file,
      name: "sample_google_sheet2",
      id: "sample_google_sheet2_id",
      mimeType: "application/vnd.google-apps.spreadsheet",
      parentId: reqParentId,
      lastModifiedDate: "2025-07-30T11:01:54.344Z"
    },
    { 
      type: DirectoryEntryTypes.file,
      name: "sample_csv1.csv",
      id: "sample_csv1_id",
      mimeType: "text/csv",
      parentId: reqParentId,
      lastModifiedDate: "2025-06-30T11:01:54.344Z"
    },
    { 
      type: DirectoryEntryTypes.file,
      name: "sample_excel1.xlsx",
      id: "sample_excel1_id",
      mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      parentId: reqParentId,
      lastModifiedDate: "2025-02-28T11:01:54.344Z"
    },
  ];

  const listDirectoryContentsResult: ListDirectoryContentsResponse = { parentId: reqParentId, data: mockdata };
      return res.json(listDirectoryContentsResult);

  }catch (err) {
      console.log(`Encountered an error listing directory contents: ${err.message}`);
    }
};

export const listDrives = (req: IReq<ListDrivesBody>, res: IRes) => {

  try {
  const mockdata = [
      { containerId: 'drive-id-1', containerName: 'Shared Drive 1'},
      { containerId: 'drive-id-2', containerName: 'Shared Drive 2'},
      { containerId: 'drive-id-3', containerName: 'Shared Drive 3'},
    ];
  const listDrivesResult: ListDrivesResponse = { containerType: "drive", data: mockdata };
      return res.json(listDrivesResult);

  }catch (err) {
      console.log(`Encountered an error listing drives: ${err.message}`);
    }
};


export const listHeaders = (req: IReq<ListHeadersBody>, res: IRes) => {
  const {
    body: {
      destinationId,
    },
  } = req;
  
  try {
    console.log('Listing headers for destination', { destinationId });
    const result = processHeadersForDestination(destinationId);
    return res.json(result);
  } catch (err) {
    console.log(`Encountered an error listing headers: ${err.message}`);
  }
};

/**
 * Process headers for a specific destination and return header information
 * 
 * @param destinationId - The ID of the destination to process headers for
 * @returns An object containing headers and metadata information
 */
function processHeadersForDestination(destinationId: string): ListHeadersResponse {

  const format = detectFormat(destinationId);
  let headers: string[] = [];
  let totalRows = 0;
  let lastModified: string | undefined;

  switch (format) {
    case 'csv':
      const csvResult = processCsvHeadersMock(destinationId);
      headers = csvResult.headers;
      totalRows = csvResult.totalRows;
      break;
    
    case 'xlsx':
      const xlsxResult = processXlsxHeadersMock(destinationId);
      headers = xlsxResult.headers;
      totalRows = xlsxResult.totalRows;
      break;
    
    default:
      headers = ['Column1', 'Column2', 'Column3', 'Column4', 'Column5'];
      totalRows = 10;
  }

  lastModified = new Date().toISOString();

  return { headers };
}

/**
 * 
 * @param destinationId - The ID of the destination
 * @returns The detected format
 */
function detectFormat(destinationId: string): string {
   if (destinationId.includes('sample_csv1_id')) {
    return 'csv';
  } else if (destinationId.includes('sample_excel1_id')) {
    return 'xlsx';
  }
  return 'google-sheet';
}

/**
 * Process CSV headers - mock implementation
 * 
 * @param destinationId - The ID of the destination
 * @returns Object containing headers and total rows
 */
function processCsvHeadersMock(destinationId: string): { headers: string[]; totalRows: number } {
  return {
    headers: ['ID', 'FirstName', 'LastName', 'Email', 'RegistrationDate'],
    totalRows: 10
  };
}

/**
 * Process XLSX headers
 * 
 * @param destinationId - The ID of the destination
 * @returns Object containing headers and total rows
 */
function processXlsxHeadersMock(destinationId: string): { headers: string[]; totalRows: number } {
  return {
    headers: ['Product', 'Quantity', 'Price', 'Total', 'Date'],
    totalRows: 20
  };
}

/**
 * Export tabular data to a destination
 * 
 * @param req - Request containing headers, data, and destinationId
 * @param res - Response object to send the result
 */
export const exportToDestination = (req: IReq<ExportToDestinationBody>, res: IRes) => {
  const {
    body: {
      headers,
      data,
      destinationId,
    },
  } = req;
  
  try {
    console.info('Exporting data to destination', { 
      destinationId, 
      headerCount: headers.length,
      rowCount: data.length
    });
    
    // Validate the request
    if (!headers || !Array.isArray(headers) || headers.length === 0) {
      console.log('Invalid or empty headers array');
      return res.json({ 
        success: false
      });
    }
    
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.log('Invalid or empty data array');
      return res.json({ 
        success: false
      });
    }
    
    if (!destinationId) {
      console.log('Missing destination ID');
      return res.json({ 
        success: false
      });
    }
    
    const invalidRows = data.filter(row => row.length !== headers.length);
    if (invalidRows.length > 0) {
      console.log('Data rows have inconsistent column counts');
      return res.json({ 
        success: false
      });
    }

    if (destinationId === 'error-destination') {
      console.log('Simulating an error with the destination');
      return res.json({ 
        success: false
      });
    }
    
    console.log(`Successfully exported ${data.length} rows to destination ${destinationId}`);
    return res.json({ success: true });
    
  } catch (err) {
    console.log(`Encountered an error exporting data: ${err.message}`);
    return res.json({ 
      success: false
    });
  }

}


