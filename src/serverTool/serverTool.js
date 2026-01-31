/* eslint-disable sonarjs/no-ignored-exceptions */
/**
 * @typedef {import('./serverTool.types.js').HTTPServerOptType } HTTPServerOptType
 */
import http from 'http';
import { killProcessOnPort } from '../processTool/processTool.js';
import { spawn } from 'child_process';

/**
 * Checks if an HTTP server is running on the specified port.
 * @param {number} port
 * @param {string} [hostname]
 * @returns {Promise<boolean>}
 */
export function isHTTPServerRunning(port, hostname = '127.0.0.1') {
    return new Promise(resolve => {
        const req = http.get({ hostname, port, path: '/', timeout: 2000 }, res => {
            resolve(res.statusCode === 200);
        });
        req.on('error', () => resolve(false));
        req.on('timeout', () => {
            req.destroy();
            resolve(false);
        });
    });
}

/**
 * Stops processes listening on the given port using `npx kill-port` and waits until the port is free.
 * This avoids parsing ps output and works with a single command (no permanent install required).
 * @param {HTTPServerOptType} [opts]
 * @returns {Promise<boolean>} Resolves with true if port freed (or nothing was listening).
 */
export async function stopHTTPServer(opts = {}) {
    const { timeout = 5000, pollInterval = 200, host = '127.0.0.1', port = 6006 } = opts;
    killProcessOnPort(port);
    const start = Date.now();
    while (Date.now() - start < timeout) {
        if (!(await isHTTPServerRunning(port, host))) return true;
        await new Promise(resolve => setTimeout(resolve, pollInterval));
    }
    throw new Error(`Failed to free port ${port} after ${timeout}ms`);
}

/**
 * Runs a server asynchronously in detached mode.
 * @param {number} port
 * @param {HTTPServerOptType} config
 * @param {() => void} callback
 * @returns {Promise<void>}
 */
export async function pollServerReady(port, config = {}, callback) {
    const { timeout = 30000, pollInterval = 500 } = config;

    const start = Date.now();
    while (Date.now() - start < timeout) {
        try {
            if (await isHTTPServerRunning(port)) {
                callback();
                return;
            }
        } catch (_err) {
            // ignore and retry
        }
        await new Promise(resolve => setTimeout(resolve, pollInterval));
    }
    throw new Error(`Server not responsive after ${timeout}ms`);
}

/**
 * Runs a server asynchronously in detached mode.
 * @param {string} cmd
 * @param {HTTPServerOptType} config
 * @param {() => void} [onReady]
 * @returns {import('child_process').ChildProcess}
 */
export function runServer(cmd, config = {}, onReady) {
    const { cmdConfig = {}, port = 6006 } = config;
    // start http-server as a detached process so this function can return while the server continues

    const child = spawn(cmd, {
        shell: true,
        stdio: 'ignore',
        cwd: process.cwd(),
        detached: true,
        ...cmdConfig
    });

    // allow the child to continue running independently
    child.unref();

    if (typeof onReady === 'function') {
        pollServerReady(port, {}, onReady).catch(err => {
            console.error(`Error waiting for server to be ready: ${err}`);
        });
    }

    return child;
}
