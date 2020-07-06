import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user-list/user';

export enum userListActionsType {
	initUser = '[USER-LIST/API] Init-User User-List',
	initNewUser = '[USER-LIST/API] Init-New-User User-List',
	initUserList = '[USER-LIST/API] Init-User-List User-List',
	initUserListSuccess = '[USER-LIST/API] Init-User-List-Success User-List',
	initNewUserProfileImage = '[USER-LIST/API] Init-New-User-Profile-Image User-List',
	pickUpPointsFromUser = '[USER-LIST/API] Pick-Up-Points-From-User User-List',
	addMedicalPointsForCurrentUser = '[USER-LIST/API] Add-Medical-Points-For-Current-User User-List',
}

// tslint:disable-next-line: max-classes-per-file
export class InitUserListAction implements Action {
	public readonly type: string = userListActionsType.initUserList;
}

// tslint:disable-next-line: max-classes-per-file
export class InitUserListSuccessAction implements Action {
	public readonly type: string = userListActionsType.initUserListSuccess;

	constructor(private _payload: {
		userList: User[]
	}) { }

	public get userList(): User[] {
		return this._payload.userList;
	}
}

// tslint:disable-next-line: max-classes-per-file
export class InitUserAction implements Action {
	public readonly type: string = userListActionsType.initUser;

	constructor(private _payload: {
		user: User
	}) { }

	public get user(): User {
		return this._payload.user;
	}
}

// tslint:disable-next-line: max-classes-per-file
export class InitNewUserAction implements Action {
	public readonly type: string = userListActionsType.initNewUser;

	constructor(private _payload: {
		user: User
	}) { }

	public get user(): User {
		return this._payload.user;
	}
}

// tslint:disable-next-line: max-classes-per-file
export class InitNewUserProfileImageUserListAction implements Action {
	public readonly type: string = userListActionsType.initNewUserProfileImage;

	constructor(private _payload: {
		newImage: string
	}) { }

	public get newImage(): string {
		return this._payload.newImage;
	}
}

// tslint:disable-next-line: max-classes-per-file
export class PickUpPointsFromUserUserListAction implements Action {
	public readonly type: string = userListActionsType.pickUpPointsFromUser;

	constructor(private _payload: {
		userId: string,
		medicalPoints: number
	}) { }

	public get userId(): string {
		return this._payload.userId;
	}

	public get medicalPoints(): number {
		return this._payload.medicalPoints;
	}
}

// tslint:disable-next-line: max-classes-per-file
export class AddMedicalPointsForCurrentUserUserListAction implements Action {
	public readonly type: string = userListActionsType.addMedicalPointsForCurrentUser;

	constructor(private _payload: {
		medicalPoints: number
	}) { }

	public get medicalPoints(): number {
		return this._payload.medicalPoints;
	}
}

export type UserListActions =
	InitUserAction
	| InitNewUserAction
	| InitUserListAction
	| InitUserListSuccessAction
	| InitNewUserProfileImageUserListAction
	| AddMedicalPointsForCurrentUserUserListAction;
