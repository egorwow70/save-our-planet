import { Injectable } from '@angular/core';
import { UserListDataService } from 'src/app/services/user-data.service';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { userListActionsType, InitUserListSuccessAction } from './user-list.actions';
import { switchMap, map } from 'rxjs/operators';
import { User } from 'src/app/models/user-list/user';
import { Observable } from 'rxjs';

@Injectable()
export class UserListEffects {
	constructor(
		private _actions$: Actions,
		private _userListDataService: UserListDataService
	) {

	}

	@Effect()
	public loadUserList(): Observable<InitUserListSuccessAction> {
		return this._actions$.pipe(
			ofType(userListActionsType.initUserList),
			switchMap(() => this._userListDataService.loadUserList()
				.pipe(
					map((userList: User[]) => {
						return new InitUserListSuccessAction({ userList });
					})
				)
			)
		);
	}

}
