import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { CountryListDataService } from 'src/app/services/country-data.service';
import { Capital } from 'src/app/models/country-list/capital';
import { CapitalListSnapshot } from 'src/app/models/country-list/capital-list-snapshot';
import {
	ToggleMapModeCountryListAction,
	ToggleShowCapitalsModeCountryListAction,
	SearchCountrySuccessAction,
	SearchCountryAction,
	SearchPreviousCountryAction,
	SearchNextCountryAction,
	SearchSubRegionCountriesAction,
	InitCountryListAction,
	InitCapitalsCoordinatesDataAction,
	InitCountriesForestAreaDataAction,
	InitCountriesForestAreaAction,
	InitCapitalsCoordinatesAction,
	IsCountriesLoadingSuccessAction
} from './country-list.actions';
import { Country } from 'src/app/models/country-list/country';

@Injectable()
export class FacadeServiceCountryList {

	constructor(
		private _store$: Store,
		private _countryListDataService: CountryListDataService
	) { }

	public saveCapitalsCoordinatesData(capitalsData: Capital[]): void {
		this._countryListDataService.saveCapitalsCoordinatesData(
			new CapitalListSnapshot(
				capitalsData
			)
		);
	}

	public toggleMapMode(): void {
		this._store$.dispatch(new ToggleMapModeCountryListAction());
	}

	public toggleCapitalsMode(): void {
		this._store$.dispatch(new ToggleShowCapitalsModeCountryListAction());
	}

	public searchCurrentCountry(countryName: string): void {
		this._store$.dispatch(new SearchCountryAction({ name: countryName }));
	}

	public searchPreviousCountry(countryName: string): void {
		this._store$.dispatch(new SearchPreviousCountryAction({ name: countryName }));
	}

	public searchNextCountry(countryName: string): void {
		this._store$.dispatch(new SearchNextCountryAction({ name: countryName }));
	}

	public searchCountry(countryName: string): void {
		this.searchCurrentCountry(countryName);
		this.searchPreviousCountry(countryName);
		this.searchNextCountry(countryName);
	}

	public searchCountrySuccess(): void {
		this._store$.dispatch(new SearchCountrySuccessAction());
	}

	public searchSubRegionCountries(regionName: string, subRegionName: string): void {
		this._store$.dispatch(new SearchSubRegionCountriesAction({ regionName, subRegionName }));
	}

	public initCountryList(): void {
		this._store$.dispatch(new InitCountryListAction());
	}

	public initCapitalsCoordinatesData(countryList: Country[]): void {
		this._store$.dispatch(new InitCapitalsCoordinatesDataAction({ countryList }));
	}

	public initCountriesForestAreaData(): void {
		this._store$.dispatch(new InitCountriesForestAreaDataAction());
	}

	public initCountriesForestArea(): void {
		this._store$.dispatch(new InitCountriesForestAreaAction());
	}

	public initCapitalsCoordinates(): void {
		this._store$.dispatch(new InitCapitalsCoordinatesAction());
	}

	public countriesLoadingSuccess(): void {
		this._store$.dispatch(new IsCountriesLoadingSuccessAction());
	}

}
