import { Action } from '@ngrx/store';
import { Donation } from 'src/app/models/donation-list/donation';
import { Country } from 'src/app/models/country-list/country';
import { User } from 'src/app/models/user-list/user';

export enum donationListActionsType {
	initDonationList = '[DONATION-LIST/API] Init-Donation-List Donation-List',
	InitDonationListSuccess = '[DONATION-LIST/API] Init-Donation-List-Success Donation-List',
	initNewUserDonationBeforeRegistration = '[DONATION-LIST/API] Init-New-User-Donation Donation-List',
	makeDonation = '[DONATION-LIST/API] Make-Donation Donation-List',
	deleteDonation = '[DONATION-LIST/API] Delete-Donation Donation-List',
	initNewCountryForDonation = '[DONATION-LIST/API] Init-New-Country-For-Donation Donation-List',
	deleteNewCountryForDonation = '[DONATION-LIST/API] Delete-New-Country-For-Donation Donation-List',
	initDonationCurrentCountry = '[DONATION-LIST/API] Init-Donation-Current-Country Donation-List',
	initUserDonationList = '[DONATION-LIST/API] Init-User-Donation-List Donation-List',
	initUserDonationListSuccess = '[DONATION-LIST/API]  Init-User-Donation-List-Success Donation-List',
	initAllDonatorsDataByCost = '[DONATION-LIST/API] Init-All-Donators-Data-By-Cost Donation-List',
	initAllDonatorsDataByTree = '[DONATION-LIST/API] Init-All-Donators-Data-By-Tree Donation-List'
}

// tslint:disable-next-line: max-classes-per-file
export class InitDonationListAction implements Action {
	public readonly type: string = donationListActionsType.initDonationList;
}

// tslint:disable-next-line: max-classes-per-file
export class InitDonationListSuccessAction implements Action {
	public readonly type: string = donationListActionsType.InitDonationListSuccess;

	constructor(private _payload: {
		donationList: Donation[]
	}) { }

	public get donationList(): Donation[] {
		return this._payload.donationList;
	}
}

// tslint:disable-next-line: max-classes-per-file
export class InitNewUserDonationBeforeRegistrationAction implements Action {
	public readonly type: string = donationListActionsType.initNewUserDonationBeforeRegistration;

	constructor(private _payload: {
		donation: Donation
	}) { }

	public get newDonation(): Donation {
		return this._payload.donation;
	}
}

// tslint:disable-next-line: max-classes-per-file
export class MakeDonationAction implements Action {
	public readonly type: string = donationListActionsType.makeDonation;

	constructor(private _payload: {
		donation: Donation,
		userId: string
	}) { }

	public get donation(): Donation {
		return this._payload.donation;
	}

	public get userId(): string {
		return this._payload.userId;
	}

}

// tslint:disable-next-line: max-classes-per-file
export class DeleteDonationAction implements Action {
	public readonly type: string = donationListActionsType.deleteDonation;

	constructor(private _payload: {
		donation: Donation
	}) { }

	public get donation(): Donation {
		return this._payload.donation;
	}
}

// tslint:disable-next-line: max-classes-per-file
export class InitNewCountryForDonationAction implements Action {
	public readonly type: string = donationListActionsType.initNewCountryForDonation;

	constructor(private _payload: {
		country: Country
	}) { }

	public get newCountry(): Country {
		return this._payload.country;
	}
}

// tslint:disable-next-line: max-classes-per-file
export class DeleteNewCountryForDonationAction implements Action {
	public readonly type: string = donationListActionsType.deleteNewCountryForDonation;

	constructor(private _payload: {
		country: Country
	}) { }

	public get newCountry(): Country {
		return this._payload.country;
	}
}

// tslint:disable-next-line: max-classes-per-file
export class InitDonationCurrentCountryAction implements Action {
	public readonly type: string = donationListActionsType.initDonationCurrentCountry;

	constructor(private _payload: {
		donation: Donation,
		country: Country
	}) { }

	public get donation(): Donation {
		return this._payload.donation;
	}
	public get country(): Country {
		return this._payload.country;
	}
}

// tslint:disable-next-line: max-classes-per-file
export class InitUserDonationListAction implements Action {
	public readonly type: string = donationListActionsType.initUserDonationList;

	constructor(private _payload: {
		id: string
	}) { }

	public get id(): string {
		return this._payload.id;
	}

}

// tslint:disable-next-line: max-classes-per-file
export class InitUserDonationListSuccessAction implements Action {
	public readonly type: string = donationListActionsType.initUserDonationListSuccess;
}

// tslint:disable-next-line: max-classes-per-file
export class InitAllDonatorsDataByCostAction implements Action {
	public readonly type: string = donationListActionsType.initAllDonatorsDataByCost;

	constructor(private _payload: {
		userList: User[]
	}) { }

	public get userList(): User[] {
		return this._payload.userList;
	}
}

// tslint:disable-next-line: max-classes-per-file
export class InitAllDonatorsDataByTreeAction implements Action {
	public readonly type: string = donationListActionsType.initAllDonatorsDataByTree;

	constructor(private _payload: {
		userList: User[]
	}) { }

	public get userList(): User[] {
		return this._payload.userList;
	}
}

export type DonationListActions =
	InitDonationListAction
	| InitDonationListSuccessAction
	| InitNewUserDonationBeforeRegistrationAction
	| MakeDonationAction
	| DeleteDonationAction
	| InitNewCountryForDonationAction
	| DeleteNewCountryForDonationAction
	| InitUserDonationListAction
	| InitDonationCurrentCountryAction
	| InitUserDonationListSuccessAction
	| InitAllDonatorsDataByCostAction
	| InitAllDonatorsDataByTreeAction;
