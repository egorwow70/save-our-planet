import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user-list/user';
import { Donation } from 'src/app/models/donation-list/donation';

export enum donationStatisticListActionsType {
	initUserList = '[DONATION-STATISTIC-LIST/API] Init-User-List Donation-Statistic-List',
	initDonationList = '[DONATION-STATISTIC-LIST/API] Init-Donation-List Donation-Statistic-List',
	initAllDonatorsDataByCost = '[DONATION-STATISTIC-LIST/API] Init-All-Donators-Data-By-Cost Donation-Statistic-List',
	initAllDonatorsDataByTree = '[DONATION-STATISTIC-LIST/API] Init-All-Donators-Data-By-Tree Donation-Statistic-List',
	initTopTenDataStatistic = '[DONATION-STATISTIC-LIST/API] Init-Top-10-Data-Statistic Donation-Statistic-List',
	sortTop = '[DONATION-STATISTIC-LIST/API] Sort-Top Donation-Statistic-List',
	sortBottom = '[DONATION-STATISTIC-LIST/API] Sort-Bottom Donation-Statistic-List',
	initAllCountriesDataByCost = '[DONATION-STATISTIC-LIST/API] Init-All-Countries-Data-By-Cost Donation-Statistic-List',
	initAllCountriesDataByTree = '[DONATION-STATISTIC-LIST/API] Init-All-Countries-Data-By-Tree Donation-Statistic-List'
}

// tslint:disable-next-line: max-classes-per-file
export class InitUserListDonationStatisticListAction implements Action {
	public readonly type: string = donationStatisticListActionsType.initUserList;

	constructor(private _payload: {
		userList: User[]
	}) { }

	public get userList(): User[] {
		return this._payload.userList;
	}
}

// tslint:disable-next-line: max-classes-per-file
export class InitDonationListDonationStatisticListAction implements Action {
	public readonly type: string = donationStatisticListActionsType.initDonationList;

	constructor(private _payload: {
		donationList: Donation[]
	}) { }

	public get donationList(): Donation[] {
		return this._payload.donationList;
	}
}

// tslint:disable-next-line: max-classes-per-file
export class InitAllDonatorsDataByCostDonationStatisticListAction implements Action {
	public readonly type: string = donationStatisticListActionsType.initAllDonatorsDataByCost;
}

// tslint:disable-next-line: max-classes-per-file
export class InitAllDonatorsDataByTreeDonationStatisticListAction implements Action {
	public readonly type: string = donationStatisticListActionsType.initAllDonatorsDataByTree;
}

// tslint:disable-next-line: max-classes-per-file
export class SortTopDonationStatisticListAction implements Action {
	public readonly type: string = donationStatisticListActionsType.sortTop;
}

// tslint:disable-next-line: max-classes-per-file
export class SortBottomDonationStatisticListAction implements Action {
	public readonly type: string = donationStatisticListActionsType.sortBottom;
}

// tslint:disable-next-line: max-classes-per-file
export class InitAllCountriesDataByCostDonationStatisticListAction implements Action {
	public readonly type: string = donationStatisticListActionsType.initAllCountriesDataByCost;
}

// tslint:disable-next-line: max-classes-per-file
export class InitAllCountriesDataByTreeDonationStatisticListAction implements Action {
	public readonly type: string = donationStatisticListActionsType.initAllCountriesDataByTree;
}

// tslint:disable-next-line: max-classes-per-file
export class InitTopTenDataStatisticDonationStatisticListAction implements Action {
	public readonly type: string = donationStatisticListActionsType.initTopTenDataStatistic;
}

export type DonationStatisticListActions =
	InitUserListDonationStatisticListAction
	| InitDonationListDonationStatisticListAction
	| InitAllDonatorsDataByCostDonationStatisticListAction
	| InitAllDonatorsDataByTreeDonationStatisticListAction
	| InitTopTenDataStatisticDonationStatisticListAction
	| SortTopDonationStatisticListAction
	| SortBottomDonationStatisticListAction;
