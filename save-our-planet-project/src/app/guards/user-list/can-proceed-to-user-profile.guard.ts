import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { selectUser } from '../../store/user-list/user-list.selectors';
import { Store } from '@ngrx/store';
import { User } from '../../models/user-list/user';

@Injectable()
export class CanProceedToUserProfileGuard implements CanActivate {

	constructor(
		private _store$: Store,
		private _router: Router
	) {

	}

	public canActivate(): boolean {
		let currentUser: User;
		this._store$.select(selectUser)
			.subscribe((user: User) => {
				currentUser = user;
			}).unsubscribe();
		if (currentUser) {
			return true;
		} else {
			this._router.navigate(['/registration', 'mode', 'login-mode']);
			return false;
		}
	}
}
