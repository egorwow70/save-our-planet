import { Injectable, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class MyErrorHandler implements ErrorHandler {
	constructor(
		private _router: Router
	) {

	}
	public handleError(error: Error): void {
		console.log(error.message);
		this._router.navigate(['/not-found']);
	}
}
