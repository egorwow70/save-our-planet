import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { CountryListDataService } from 'src/app/services/country-data.service';
import { switchMap, map } from 'rxjs/operators';
import {
	countryListActionsType,
	InitCountryListSuccessAction,
	InitCountriesForestAreaDataSuccessAction,
	InitCapitalsCoordinatesDataSuccessAction
} from './country-list.actions';
import { Country } from 'src/app/models/country-list/country';
import { Capital } from 'src/app/models/country-list/capital';
import { Observable } from 'rxjs';

@Injectable()
export class CountryListEffects {
	constructor(
		private _actions$: Actions,
		private _countryListDataService: CountryListDataService
	) {

	}

	@Effect()
	public loadCountryList(): Observable<InitCountryListSuccessAction> {
		return this._actions$.pipe(
			ofType(countryListActionsType.initCountries),
			switchMap(() => this._countryListDataService.loadCountriesList()
				.pipe(
					map((currentCountryList: Country[]) => {
						return new InitCountryListSuccessAction({ countryList: currentCountryList });
					})
				)
			)
		);
	}

	@Effect()
	public loadCountriesForestAreaData(): Observable<InitCountriesForestAreaDataSuccessAction> {
		return this._actions$.pipe(
			ofType(countryListActionsType.initCountriesForestAreaData),
			switchMap(() => this._countryListDataService.loadCountriesForestAreaData()
				.pipe(
					map((countriesForestData: any) => {
						return new InitCountriesForestAreaDataSuccessAction({ countriesForestAreaData: countriesForestData });
					})
				)
			)
		);
	}

	@Effect()
	public loadCapitalsCoordinates(): Observable<unknown> {
		return this._actions$.pipe(
			ofType(countryListActionsType.initCapitalsCoordinatesData),
			switchMap((payload: { countryList: Country[] }) => this._countryListDataService.loadCapitalsCoordinatesData(payload.countryList)
				.pipe(
					map((currentCapitalsData: Capital[]) => {
						return new InitCapitalsCoordinatesDataSuccessAction({ capitalsCoordinatesData: currentCapitalsData });
					})
				)
			)
		);
	}

}
