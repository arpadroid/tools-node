import { existsSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export const fileName = fileURLToPath(import.meta.url);
export const dirName = dirname(fileName);

/**
 * Find the first existing location from a list of possible locations.
 * @param {string[]} locations - An array of file paths to check.
 * @returns {string|null} The first existing file path, or null if none exist.
 */
export function findLocation(locations) {
    return locations.find(loc => existsSync(loc)) || null;
}
