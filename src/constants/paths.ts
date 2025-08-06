import { Immutable } from '../utils/types';

const paths = {
  Base: '/api',
  FileOutputTabularFormat: {
    Base: '/',
    ListHeaders: {
      Post: '/listHeaders',
    },
    ExportToDestination: {
      Post: '/exportToDestination',
    },
    FileIOListDrives: {
      Post: '/fileIOListDrives',
    },
    FileIOListDirectoryContents: {
      Post: '/fileIOListDirectoryContents',
    }
  },
  Auth: {
    Base: '/oauth',
    Authorize: {
      Get: '/authorize',
    },
    Token: {
      Post: '/token',
    },
    UserInfo: {
      Get: '/userinfo',
    },
  },
};

export type TPaths = Immutable<typeof paths>;
export default paths as TPaths;
