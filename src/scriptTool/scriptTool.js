/**
 * Given an object with script arguments, prepare them for execution by converting them into an array of command-line arguments.
 * @param {Record<string, any>} args
 * @returns {string[]} An array of command-line arguments ready for execution.
 */
export function prepareArgs(args = {}) {
    const argArray = [];
    for (const [key, value] of Object.entries(args)) {
        if (typeof value === 'boolean') {
            if (value) {
                argArray.push(`--${key}`);
            }
        } else if (typeof value === 'string') {
            argArray.push(`--${key}`);
            argArray.push(value);
        }
    }
    return argArray;
}
