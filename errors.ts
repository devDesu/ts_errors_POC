export class AccountNotInitialized extends Error {
	readonly publicKey: string;

	constructor(pk: string) {
		super();
		this.publicKey = pk;
	}
}

export class ImportantAccountNotInitialized extends AccountNotInitialized {}

function processLogs(raw: string[]): string[] {
	const lowercase = raw.map((log) => log.toLowerCase());
	const MARKER = "custom_string";

	return lowercase.map((log, idx) => (log.includes(MARKER) ? raw[idx] : null)).filter((log) => log != null);
}

export class CustomError extends Error {
    readonly processedLogs: string[];
    
    constructor(rawLogs: string[]) {
        super();
        this.processedLogs = processLogs(rawLogs);
    }
}