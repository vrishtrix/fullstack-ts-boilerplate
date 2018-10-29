import { join } from 'path';

export const DIST_FOLDER = join(process.cwd(), 'dist');
export const webServerFolder = (dir = '') => join(DIST_FOLDER, 'web-server', dir);
export const webFolder = (dir = '') => join(DIST_FOLDER, 'apps', 'web', dir);
