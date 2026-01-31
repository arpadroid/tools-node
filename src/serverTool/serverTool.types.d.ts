export type HTTPServerOptType = {
    timeout?: number;
    pollInterval?: number;
    host?: string;
    port?: number;
    cmdConfig?: Record<string, unknown>;
};
