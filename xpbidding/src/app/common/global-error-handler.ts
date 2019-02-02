import { ErrorHandler } from "@angular/core";

export class GlobalErrorHandler implements ErrorHandler {
    handleError(error: any): void {
        console.log(`Unhandled Exception Occured: ${error}`);
        // Code to log error messages on server/file, etc..
    }
}