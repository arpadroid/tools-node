import { jest } from '@jest/globals';
import { safeReadJson } from './jsonTool.js';

describe('safeReadJson', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('returns parsed JSON when the file contains valid JSON', () => {
        expect(safeReadJson('./src/jsonTool/jsonTool.mock.json')).toEqual({ testProp: 'testValue' });
    });

    test('logs an error and returns undefined when parsing fails', () => {
        const logErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        const result = safeReadJson('./src/jsonTool/jsonTool.mock.jso');
        expect(result).toBeUndefined();

        expect(logErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining('Failed to parse JSON file'),
            expect.objectContaining({
                code: 'ENOENT'
            })
        );

        logErrorSpy.mockRestore();
    });
});
