import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
	selectCountryListIsLoading,
	selectCountryListIsInitedCountries,
	selectIsInitedCountriesForestAreaData,
	selectIsInitedCapitalsCoordinatesData,
	selectCountryList,
	selectCapitalsCoordinatesData
} from './store/country-list/country-list.selectors';
import { takeUntil } from 'rxjs/operators';
import { Subject, combineLatest } from 'rxjs';
import { Country } from './models/country-list/country';
import { FacadeServiceCountryList } from './store/country-list/country-list.facade';
import { Capital } from './models/country-list/capital';
import { selectTreeList, selectIsInitedTrees } from './store/tree-list/tree-list.selectors';
import { Tree } from './models/tree-list/tree';
import { selectUserList } from './store/user-list/user-list.selectors';
import { User } from './models/user-list/user';
import { Donation } from './models/donation-list/donation';
import { selectDonationList } from './store/donation-list/donation-list.selectors';
import { FacadeServiceUserList } from './store/user-list/user-list.facade';
import { FacadeServiceDonationList } from './store/donation-list/donation-list.facade';
import { FacadeServiceTreeList } from './store/tree-list/tree-list.facade';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

	private _destroySubject$: Subject<boolean> = new Subject();

	private _countryList: Country[] = null;

	public title: string = 'save-our-planet-project';
	public menuMode: boolean;
	public isLoading: boolean = true;

	constructor(
		private store$: Store,
		private _facadeCountryListService: FacadeServiceCountryList,
		private _facadeTreeListService: FacadeServiceTreeList,
		private _facadeUserListService: FacadeServiceUserList,
		private _facadeDonationListService: FacadeServiceDonationList,
	) {

	}

	public ngOnInit(): void {

		this.store$.select(selectUserList)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((userList: User[]) => {
				if (!Boolean(userList)) {
					this._facadeUserListService.initUserList();
				}
			});
		this.store$.select(selectCountryList)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((countryList: Country[]) => {
				if (Boolean(countryList)) {
					this._countryList = countryList;
				} else {
					this._facadeCountryListService.initCountryList();
				}
			});
		this.store$.select(selectCapitalsCoordinatesData)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((capitalsCoordinatesData: Capital[]) => {
				if (capitalsCoordinatesData) {
					this._facadeCountryListService.saveCapitalsCoordinatesData(capitalsCoordinatesData);
				}
			});
		this.store$.select(selectCountryListIsLoading)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((isLoading: boolean) => {
				this.isLoading = isLoading;
			});
		this.store$.select(selectCountryListIsInitedCountries)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((isInitedCountries: boolean) => {
				if (isInitedCountries) {
					this._facadeCountryListService.initCapitalsCoordinatesData(this._countryList);
					this._facadeCountryListService.initCountriesForestAreaData();
				}
			});
		this.store$.select(selectIsInitedCountriesForestAreaData)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((isInitedCountriesForestAreaData: boolean) => {
				if (isInitedCountriesForestAreaData) {
					this._facadeCountryListService.initCountriesForestArea();
				}
			});
		this.store$.select(selectIsInitedCapitalsCoordinatesData)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((isInitedCapitalsCoordinatesData: boolean) => {
				if (isInitedCapitalsCoordinatesData) {
					this._facadeCountryListService.initCapitalsCoordinates();
				}
			});
		combineLatest([
			this.store$.select(selectIsInitedCountriesForestAreaData)
				.pipe(
					takeUntil(this._destroySubject$)
				),
			this.store$.select(selectIsInitedCapitalsCoordinatesData)
				.pipe(
					takeUntil(this._destroySubject$)
				)
		]).subscribe(([isInitedCountriesForestAreaData, isInitedCapitalsCoordinatesData]: [boolean, boolean]) => {
			if (isInitedCountriesForestAreaData && isInitedCapitalsCoordinatesData) {
				this._facadeCountryListService.countriesLoadingSuccess();
			}
		});

		this.store$.select(selectIsInitedTrees)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((isInitedTrees: boolean) => {
				if (isInitedTrees) {
					this._facadeTreeListService.treesLoadingSuccess();
				}
			});
		this.store$.select(selectTreeList)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((treeList: Tree[]) => {
				if (!Boolean(treeList)) {
					this._facadeTreeListService.initTreeList();
				}
			});
		this.store$.select(selectDonationList)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((donationList: Donation[]) => {
				if (!Boolean(donationList)) {
					this._facadeDonationListService.initDonationList();
				}
			});

	}

	public ngOnDestroy(): void {
		this._destroySubject$.next(true);
		this._destroySubject$.complete();
	}

	public toggleMenuMode(): void {
		this.menuMode = !this.menuMode;
	}
}
