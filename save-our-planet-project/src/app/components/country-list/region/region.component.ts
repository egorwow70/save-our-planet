import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeUntil, delay } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { Country } from 'src/app/models/country-list/country';
import { selectSubRegionsCountries, selectSearchCountry, selectSelectedCountry } from 'src/app/store/country-list/country-list.selectors';
import { FacadeServiceCountryList } from 'src/app/store/country-list/country-list.facade';
import { selectCountriesForDonation } from 'src/app/store/donation-list/donation-list.selectors';

@Component({
	selector: 'app-region',
	templateUrl: './region.component.html',
	styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit, OnDestroy {

	public static windowScrollHeight: Number = 2;
	public static scrollBlock: HTMLElement;
	public static scrollUpButton: HTMLElement;

	private _destroySubject$: Subject<boolean> = new Subject();

	private _isSearchCountry: boolean;

	private _countriesForDonation: Country[];

	private _selectedCountry: Country;

	public regionName: string;
	public subRegionName: string;

	public subRegionsCountries: Country[];

	constructor(
		private _store$: Store,
		private _router: Router,
		private _activatedRoute: ActivatedRoute,
		private _facadeCountryListService: FacadeServiceCountryList,
	) { }

	public static isScrolling(): void {
		if (RegionComponent.scrollBlock.scrollTop > RegionComponent.windowScrollHeight) {
			RegionComponent.scrollUpButton.classList.add('-app-scroll-up-button_tree-category-visible');
		} else {
			RegionComponent.scrollUpButton.classList.remove('-app-scroll-up-button_tree-category-visible');
		}
	}

	private navigateToCurrentSubRegionRoute(): void {
		const firstSubRegionCountryName: string = this.subRegionsCountries[0].name;
		const firstSubRegionCountryRouterName: string = firstSubRegionCountryName.replace(/\./g, '')
			.replace(/\(|\)/g, '')
			.toLowerCase()
			.split(' ')
			.join('-');
		this._router.navigate(['/countries', 'region', this.regionName, this.subRegionName, 'country', firstSubRegionCountryRouterName]);
	}

	public ngOnInit(): void {
		RegionComponent.scrollBlock = document.querySelector('.-app-region');

		RegionComponent.scrollUpButton = document.querySelector('.-app-scroll-up-button_sub-region-category');

		RegionComponent.scrollBlock.addEventListener('scroll', RegionComponent.isScrolling);

		this._activatedRoute.params
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((params: Params) => {
				this.regionName = params.regionName;
				this.subRegionName = params.subRegionName;

				this._facadeCountryListService.searchSubRegionCountries(this.regionName, this.subRegionName);
			});

		this._store$.select(selectSearchCountry)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((searchCountry: Country) => {
				if (Boolean(searchCountry)) {
					this._isSearchCountry = true;
				}
			});

		this._store$.select(selectCountriesForDonation)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((countriesForDonation: Country[]) => {
				if (Boolean(countriesForDonation)) {
					this._countriesForDonation = countriesForDonation;
				}
			});

		this._store$.select(selectSubRegionsCountries)
			.pipe(
				delay(0),
				takeUntil(this._destroySubject$)
			).subscribe((subRegionsCountries: Country[]) => {
				if (Boolean(subRegionsCountries)) {
					this.subRegionsCountries = subRegionsCountries;
					if (!this._isSearchCountry) {
						this.navigateToCurrentSubRegionRoute();
					}
				}
			});

		this._store$.select(selectSelectedCountry)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((selectedCountry: Country) => {
				if (Boolean(selectedCountry)) {
					this._selectedCountry = selectedCountry;
				}
			});
	}

	public ngOnDestroy(): void {
		this._destroySubject$.next(true);
		this._destroySubject$.complete();
		this._facadeCountryListService.resetSelectedCountry();
		RegionComponent.scrollBlock.removeEventListener('scroll', RegionComponent.isScrolling);
	}

	public scrollTop(): void {
		RegionComponent.scrollBlock.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}

	public canDeactivate(): boolean {
		const deactivateQuestion: string = 'You haven’t chosen country. Are you sure that you want to go from this page? For donation you need at least one country';
		return (!Boolean(this._countriesForDonation))
			? confirm(deactivateQuestion)
			: true;
	}

	public selectCountry(country: Country): void {
		this._facadeCountryListService.selectCountry(country);
	}

	public isCountrySelected(country: Country): boolean {
		return Boolean(this._selectedCountry)
			&& this._selectedCountry.equals(country);
	}

}
