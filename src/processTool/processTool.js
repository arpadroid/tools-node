/* eslint-disable sonarjs/no-ignored-exceptions */
import { execSync } from 'child_process';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs';
const argv = /** @type {Record<string, any>} */ (yargs(hideBin(process.argv)).argv);

export { argv };

/**
 * Stops processes listening on the given port using `npx kill-port`.
 * @param {number} port
 * @param {object} [options]
 * @returns {void}
 */
export function killProcessOnPort(port, options = {}) {
    try {
        // use npx to run kill-port without prompting for install
        // --yes avoids interactive prompts
        execSync(`npx --yes kill-port ${port}`, { encoding: 'utf8', stdio: 'ignore', ...options });
    } catch (_err) {
        // kill-port may exit non-zero when nothing is listening; we'll still check the port
    }
}
