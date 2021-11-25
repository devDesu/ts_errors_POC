import {ImportantAccountNotInitialized, CustomError} from "./errors";
import {ERROR_CODE_1, ERROR_CODE_2} from './errorCodes';

function testCustomErrors(): void {
    // do something
    const x = Math.random()*10;
    if(x > 5) {
        throw new ImportantAccountNotInitialized("abc")
    }
    // account is initialized, do stuff
    const y = Math.random()*10;
    const logs = ["this is sOmE CUSTOM_ERROR and we need it", "trash", "trash too", "cusTOM_erROR #2"]
    if (y >= 3) {
        throw new CustomError(logs);
    }
}

function testObjectErrors(): void {
    // do something
    const x = Math.random()*10;
    if(x > 5) {
        throw new Error({code: ERROR_CODE_1, message: "object error 1"})
    }
    const y = Math.random()*10;
    if (y >= 3) {
        throw new Error({code: ERROR_CODE_2, message: "my object error 2"})
    }
}

function main(): void {
    try {
        testCustomErrors();
    } catch(e) {
        if (e instanceof ImportantAccountNotInitialized) {
            console.log(e.publicKey); // get context from error object
        } else if (e instanceof CustomError) {
            console.log(e.processedLogs);
        } else {
            throw e; // unexpected error
        }
    }
    
    try {
        testObjectErrors();
    } catch(e) {
        if(Object.prototype.hasOwnProperty.call(e, "code")) {
            if(e.code == ERROR_CODE_1) {
                // handle error 1
                console.log(e.code, e.message)
            } else if (e.code == ERROR_CODE_2) {
                // handle error 2
                console.log(e.code, e.message)
            } else {
                throw e; // unexpected
            }
        } else {
            throw e; // unexpected error
        }
    }
}