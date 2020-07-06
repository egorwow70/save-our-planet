import { Component, OnInit, OnDestroy } from '@angular/core';
import { Country } from '../models/country-list/country';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeUntil, delay } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import {
	selectSearchCountry,
	selectIsCountrySearchLoading,
	selectSearchNextCountry,
	selectSearchPreviousCountry
} from '../store/country-list/country-list.selectors';
import { FacadeServiceDonationList } from '../store/donation-list/donation-list.facade';
import { FacadeServiceCountryList } from '../store/country-list/country-list.facade';
import { selectCountriesForDonation } from '../store/donation-list/donation-list.selectors';

@Component({
	selector: 'app-country',
	templateUrl: './country.component.html',
	styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit, OnDestroy {

	private _destroySubject$: Subject<boolean> = new Subject();

	private _appNavigationDonationButton: HTMLElement;

	private _isChosenAtLeastOneCountry: boolean;

	private _selectedCountriesForDonation: Country[];

	public isSearchLoading: boolean = true;

	public country: Country;
	public previousCountry: Country;
	public nextCountry: Country;

	public isPreviousCountry: boolean;
	public isNextCountry: boolean;

	public isCanChosenCountry: boolean = true;

	constructor(
		private _store$: Store,
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _facadeDonationListService: FacadeServiceDonationList,
		private _facadeCountryListService: FacadeServiceCountryList
	) { }

	private canChosenCountry(countryName: string): boolean {
		if (Boolean(this._selectedCountriesForDonation)) {
			const chosenCountry: Country = this._selectedCountriesForDonation.find((country: Country) => country.name === countryName);
			return !Boolean(chosenCountry);
		} else {
			return true;
		}
	}

	private switchRouterToSomeCountry(countryName: string): void {
		const countryRouterName: string = countryName.replace(/\./g, '')
			.replace(/\(|\)/g, '')
			.toLowerCase()
			.split(' ')
			.join('-');

		const countryRegionName: string = this.country.region;
		const countrySubRegionName: string = this.country.subRegion;
		const countryRegionRouterName: string = this.takeRouterNameOfRegionOrSubRegion(countryRegionName);
		const countrySubRegionRouterName: string = this.takeRouterNameOfRegionOrSubRegion(countrySubRegionName);

		this._router.navigate([
			'/countries',
			'region',
			countryRegionRouterName,
			countrySubRegionRouterName,
			'country',
			countryRouterName
		]);
	}

	private takeRouterNameOfRegionOrSubRegion(name: string): string {
		return name.toLowerCase().split(' ')[0];
	}

	public ngOnInit(): void {
		this._activatedRoute.params
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((params: Params) => {
				this._appNavigationDonationButton = document.querySelector('.-app-navigation__donation-button');
				this._appNavigationDonationButton.classList.remove('-app-navigation__donation-button_blinking');
				this._facadeCountryListService.searchCountry(params.countryName);
			});

		this._store$.select(selectCountriesForDonation)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((selectedCountriesForDonation: Country[]) => {
				if (Boolean(selectedCountriesForDonation)) {
					this._isChosenAtLeastOneCountry = true;
					this._selectedCountriesForDonation = selectedCountriesForDonation;
				}
			});
		const countrySearchDelay: number = 3000;
		this._store$.select(selectSearchCountry)
			.pipe(
				takeUntil(this._destroySubject$),
				delay(countrySearchDelay)
			).subscribe((country: Country) => {
				if (Boolean(country)) {
					this.country = country;
					this.isCanChosenCountry = this.canChosenCountry(this.country.name);
					this._facadeCountryListService.searchCountrySuccess();
				}
			});
		this._store$.select(selectSearchPreviousCountry)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((previousCountry: Country) => {
				if (Boolean(previousCountry)) {
					this.previousCountry = previousCountry;
					this.isPreviousCountry = true;
				} else {
					this.isPreviousCountry = false;
				}
			});
		this._store$.select(selectSearchNextCountry)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((nextCountry: Country) => {
				if (Boolean(nextCountry)) {
					this.nextCountry = nextCountry;
					this.isNextCountry = true;
				} else {
					this.isNextCountry = false;
				}
			});
		this._store$.select(selectIsCountrySearchLoading)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((isSearchLoading: boolean) => {
				this.isSearchLoading = isSearchLoading;
			});

	}

	public ngOnDestroy(): void {
		this._destroySubject$.next(true);
		this._destroySubject$.complete();
	}

	public choose(): void {
		this._appNavigationDonationButton.classList.add('-app-navigation__donation-button_blinking');

		this.isCanChosenCountry = false;
		this._facadeDonationListService.initNewCountryForDonation(this.country);
	}

	public unchoose(): void {
		this.isCanChosenCountry = true;
		this._facadeDonationListService.deleteNewCountryForDonation(this.country);
	}

	public switchToPreviousCountry(): void {
		const previousCountryName: string = this.previousCountry.name;
		this.switchRouterToSomeCountry(previousCountryName);
	}

	public switchToNextCountry(): void {
		const nextCountryName: string = this.nextCountry.name;
		this.switchRouterToSomeCountry(nextCountryName);
	}

	public canDeactivate(): boolean {
		const deactivateQuestion: string = 'You haven’t chosen country. Are you sure that you want to go from this page? For donation you need at least one country';
		return (!this._isChosenAtLeastOneCountry)
			? confirm(deactivateQuestion)
			: true;
	}

}
