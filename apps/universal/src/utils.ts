import { join } from 'path';

export const DIST_FOLDER = join(process.cwd(), 'dist', 'apps');
export const webFolder = (file = '') => join(DIST_FOLDER, 'web', file);
