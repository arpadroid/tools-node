import { prepareArgs } from './scriptTool.js';

describe('scriptTool', () => {
    test('converts boolean and string properties into CLI arguments', () => {
        expect(
            prepareArgs({
                watch: true,
                port: '6006',
                verbose: false,
                retries: 3,
                name: 'storybook'
            })
        ).toEqual(['--watch', '--port', '6006', '--name', 'storybook']);
    });

    test('returns an empty array when no supported args are provided', () => {
        expect(prepareArgs()).toEqual([]);
        expect(prepareArgs({ debug: false, retries: 2, meta: null })).toEqual([]);
    });
});
