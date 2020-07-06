import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user-list/user';
import {
	InitUserListDonationStatisticListAction,
	InitDonationListDonationStatisticListAction,
	InitAllDonatorsDataByCostDonationStatisticListAction,
	InitAllDonatorsDataByTreeDonationStatisticListAction,
	SortTopDonationStatisticListAction,
	SortBottomDonationStatisticListAction,
	InitTopTenDataStatisticDonationStatisticListAction,
	InitAllCountriesDataByCostDonationStatisticListAction,
	InitAllCountriesDataByTreeDonationStatisticListAction
} from './donation-statistic-list.actions';
import { Donation } from 'src/app/models/donation-list/donation';
import { StatisticElementType } from 'src/app/models/donation-statistic-list/statistic-element-type';
import { StatisticSubCategoryType } from 'src/app/models/donation-statistic-list/statistic-sub-category-type';

@Injectable()
export class FacadeServiceDonationStatisticList {

	constructor(
		private _store$: Store,
	) { }

	public initUserList(userList: User[]): void {
		this._store$.dispatch(new InitUserListDonationStatisticListAction({ userList }));
	}

	public initDonationList(donationList: Donation[]): void {
		this._store$.dispatch(new InitDonationListDonationStatisticListAction({ donationList }));
	}

	public initAllDonatorsDataByCost(): void {
		this._store$.dispatch(new InitAllDonatorsDataByCostDonationStatisticListAction());
	}

	public initAllDonatorsDataByTree(): void {
		this._store$.dispatch(new InitAllDonatorsDataByTreeDonationStatisticListAction());
	}

	public initTopTenDataStatistic(): void {
		this._store$.dispatch(new InitTopTenDataStatisticDonationStatisticListAction());
	}

	public sortTopDonationStatisticList(): void {
		this._store$.dispatch(new SortTopDonationStatisticListAction());
	}

	public sortBottomDonationStatisticList(): void {
		this._store$.dispatch(new SortBottomDonationStatisticListAction());
	}

	public initAllCountriesDataByCost(): void {
		this._store$.dispatch(new InitAllCountriesDataByCostDonationStatisticListAction());
	}

	public initAllCountriesDataByTree(): void {
		this._store$.dispatch(new InitAllCountriesDataByTreeDonationStatisticListAction());
	}

	public initDonatorsData(statisticSubCategory: string, statisticElement: string): void {
		if (statisticSubCategory === StatisticSubCategoryType.AD) {
			if (statisticElement === StatisticElementType.BC) {
				this.initAllDonatorsDataByCost();
				this.sortTopDonationStatisticList();
			}
			if (statisticElement === StatisticElementType.BT) {
				this.initAllDonatorsDataByTree();
				this.sortTopDonationStatisticList();
			}
		}
		if (statisticSubCategory === StatisticSubCategoryType.TD) {
			if (statisticElement === StatisticElementType.BC) {
				this.initAllDonatorsDataByCost();
				this.sortTopDonationStatisticList();
				this.initTopTenDataStatistic();
			}
			if (statisticElement === StatisticElementType.BT) {
				this.initAllDonatorsDataByTree();
				this.sortTopDonationStatisticList();
				this.initTopTenDataStatistic();
			}
		}
	}

	public initCountriesData(statisticSubCategory: string, statisticElement: string): void {
		if (statisticSubCategory === StatisticSubCategoryType.AC) {
			if (statisticElement === StatisticElementType.BC) {
				this.initAllCountriesDataByCost();
				this.sortTopDonationStatisticList();
			}
			if (statisticElement === StatisticElementType.BT) {
				this.initAllCountriesDataByTree();
				this.sortTopDonationStatisticList();
			}
		}
		if (statisticSubCategory === StatisticSubCategoryType.TC) {
			if (statisticElement === StatisticElementType.BC) {
				this.initAllCountriesDataByCost();
				this.sortTopDonationStatisticList();
				this.initTopTenDataStatistic();
			} if (statisticElement === StatisticElementType.BT) {
				this.initAllCountriesDataByTree();
				this.sortTopDonationStatisticList();
				this.initTopTenDataStatistic();
			}
		}
	}

}
