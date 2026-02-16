/* eslint-disable security/detect-non-literal-fs-filename */
import { readFileSync } from 'fs';
import { log } from '@arpadroid/logger';

/**
 * Safely read and parse a JSON file. Logs an error and returns undefined if parsing fails.
 * @param {string} file
 * @returns {any|undefined}
 */
export function safeReadJson(file) {
    try {
        return JSON.parse(readFileSync(file, 'utf8'));
    } catch (err) {
        log.error(`Failed to parse JSON file ${file}`, err);
        return undefined;
    }
}
