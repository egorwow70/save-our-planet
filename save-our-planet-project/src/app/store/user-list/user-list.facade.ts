import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {
	InitNewUserProfileImageUserListAction,
	PickUpPointsFromUserUserListAction,
	AddMedicalPointsForCurrentUserUserListAction,
	InitUserAction,
	InitNewUserAction,
	InitUserListAction
} from './user-list.actions';
import { User } from 'src/app/models/user-list/user';

@Injectable()
export class FacadeServiceUserList {

	constructor(
		private _store$: Store,
	) { }

	public changeCurrentUserImage(image: string): void {
		this._store$.dispatch(new InitNewUserProfileImageUserListAction({ newImage: image }));
	}

	public pickUpPointsFromUser(userId: string, medicalPoints: number): void {
		this._store$.dispatch(new PickUpPointsFromUserUserListAction({ userId, medicalPoints }));
	}

	public addMedicalPointsForCurrentUser(medicalPoints: number): void {
		this._store$.dispatch(new AddMedicalPointsForCurrentUserUserListAction({ medicalPoints }));
	}

	public initUser(user: User): void {
		this._store$.dispatch(new InitUserAction({ user }));
	}

	public initNewUser(user: User): void {
		this._store$.dispatch(new InitNewUserAction({ user }));
	}

	public initUserList(): void {
		this._store$.dispatch(new InitUserListAction());
	}
}
