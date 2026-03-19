import { findLocation } from './fileTool.js';

describe('findLocation', () => {
    test('returns the first existing path from the list', () => {
        const result = findLocation(['./nonexistent/path.js', './src/fileTool/fileTool.js']);
        expect(result).toBe('./src/fileTool/fileTool.js');
    });

    test('returns the first match when multiple paths exist', () => {
        const result = findLocation(['./src/fileTool/fileTool.js', './src/jsonTool/jsonTool.js']);
        expect(result).toBe('./src/fileTool/fileTool.js');
    });

    test('returns null when no paths exist', () => {
        const result = findLocation(['./does/not/exist.js', './also/missing.js']);
        expect(result).toBeNull();
    });

    test('returns null for an empty array', () => {
        const result = findLocation([]);
        expect(result).toBeNull();
    });
});
