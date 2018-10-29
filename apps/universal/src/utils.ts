import { join } from 'path';

export const DIST_FOLDER = join(process.cwd(), 'dist', 'apps');
export const webFolder = (dir?: string) => join(DIST_FOLDER, 'web', dir);
