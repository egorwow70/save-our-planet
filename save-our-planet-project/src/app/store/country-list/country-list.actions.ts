import { Action } from '@ngrx/store';
import { Country } from 'src/app/models/country-list/country';
import { Capital } from 'src/app/models/country-list/capital';

export enum countryListActionsType {
	initCountries = '[COUNTRY-LIST/API] Init-Countries Country-List',
	initCountriesSuccess = '[COUNTRY-LIST/API] Init-Countries-Success Country-List',
	initCapitalsCoordinatesData = '[COUNTRY-LIST/API] Init-Capitals-Coordinates-Data Country-List',
	initCapitalsCoordinatesDataSuccess = '[COUNTRY-LIST/API] Init-Capitals-Coordinates-Data-Success Country-List',
	initCountriesForestArea = '[COUNTRY-LIST/API] Init-Countries-Forest-Area Country-List',
	initCountriesForestAreaData = '[COUNTRY-LIST/API] Init-Countries-Forest-Area-Data Country-List',
	initCountriesForestAreaDataSuccess = '[COUNTRY-LIST/API] Init-Countries-Forest-Area-Data-Success Country-List',
	isCountriesLoadingSuccess = '[COUNTRY-LIST/API] Is-Loading-Success Country-List',
	initCapitalsCoordinates = '[COUNTRY-LIST/API] Init-Capitals-Coordinates Country-List',
	searchSubRegionCountries = '[COUNTRY-LIST/API] Search-Sub-Region-Countries Country-List',
	searchCountry = '[COUNTRY-LIST/API] Search-Country Country-List',
	searchCountrySuccess = '[COUNTRY-LIST/API] Search-Country-Success Country-List',
	searchPreviousCountry = '[COUNTRY-LIST/API] Search-Previous-Country Country-List',
	searchNextCountry = '[COUNTRY-LIST/API] Search-Next-Country Country-List',
	toggleMapMode = '[COUNTRY-LIST/API] Toggle-Map-Mode Country-List',
	toggleShowCapitalsMode = '[COUNTRY-LIST/API] Toggle-Is-Show-Capitals-Mode Country-List'
}

export class InitCountryListAction implements Action {
	public readonly type: string = countryListActionsType.initCountries;

}

// tslint:disable-next-line: max-classes-per-file
export class InitCountryListSuccessAction implements Action {
	public readonly type: string = countryListActionsType.initCountriesSuccess;

	constructor(private _payload: {
		countryList: Country[]
	}) { }

	public get countryList(): Country[] {
		return this._payload.countryList;
	}
}

// tslint:disable-next-line: max-classes-per-file
export class InitCapitalsCoordinatesAction implements Action {
	public readonly type: string = countryListActionsType.initCapitalsCoordinates;

}

// tslint:disable-next-line: max-classes-per-file
export class InitCapitalsCoordinatesDataAction implements Action {
	public readonly type: string = countryListActionsType.initCapitalsCoordinatesData;

	constructor(private _payload: {
		countryList: Country[]
	}) { }

	public get countryList(): Country[] {
		return this._payload.countryList;
	}
}

// tslint:disable-next-line: max-classes-per-file
export class InitCapitalsCoordinatesDataSuccessAction implements Action {
	public readonly type: string = countryListActionsType.initCapitalsCoordinatesDataSuccess;

	constructor(private _payload: {
		capitalsCoordinatesData: Capital[]
	}) { }

	public get capitalsCoordinatesData(): Capital[] {
		return this._payload.capitalsCoordinatesData;
	}
}

// tslint:disable-next-line: max-classes-per-file
export class InitCountriesForestAreaAction implements Action {
	public readonly type: string = countryListActionsType.initCountriesForestArea;

}

// tslint:disable-next-line: max-classes-per-file
export class InitCountriesForestAreaDataAction implements Action {
	public readonly type: string = countryListActionsType.initCountriesForestAreaData;
}

// tslint:disable-next-line: max-classes-per-file
export class InitCountriesForestAreaDataSuccessAction implements Action {
	public readonly type: string = countryListActionsType.initCountriesForestAreaDataSuccess;

	constructor(private _payload: {
		countriesForestAreaData: any
	}) { }

	public get countriesForestAreaData(): any {
		return this._payload.countriesForestAreaData;
	}
}

// tslint:disable-next-line: max-classes-per-file
export class IsCountriesLoadingSuccessAction implements Action {
	public readonly type: string = countryListActionsType.isCountriesLoadingSuccess;
}

// tslint:disable-next-line: max-classes-per-file
export class SearchSubRegionCountriesAction implements Action {
	public readonly type: string = countryListActionsType.searchSubRegionCountries;

	constructor(private _payload: {
		subRegionName: string
		regionName: string
	}) { }

	public get subRegionName(): string {
		return this._payload.subRegionName;
	}

	public get regionName(): string {
		return this._payload.regionName;
	}
}

// tslint:disable-next-line: max-classes-per-file
export class SearchCountryAction implements Action {
	public readonly type: string = countryListActionsType.searchCountry;

	constructor(private _payload: {
		name: string
	}) { }

	public get name(): string {
		return this._payload.name;
	}
}

// tslint:disable-next-line: max-classes-per-file
export class SearchCountrySuccessAction implements Action {
	public readonly type: string = countryListActionsType.searchCountrySuccess;

}

// tslint:disable-next-line: max-classes-per-file
export class SearchPreviousCountryAction implements Action {
	public readonly type: string = countryListActionsType.searchPreviousCountry;

	constructor(private _payload: {
		name: string
	}) { }

	public get name(): string {
		return this._payload.name;
	}
}

// tslint:disable-next-line: max-classes-per-file
export class SearchNextCountryAction implements Action {
	public readonly type: string = countryListActionsType.searchNextCountry;

	constructor(private _payload: {
		name: string
	}) { }

	public get name(): string {
		return this._payload.name;
	}
}

// tslint:disable-next-line: max-classes-per-file
export class ToggleMapModeCountryListAction implements Action {
	public readonly type: string = countryListActionsType.toggleMapMode;
}

// tslint:disable-next-line: max-classes-per-file
export class ToggleShowCapitalsModeCountryListAction implements Action {
	public readonly type: string = countryListActionsType.toggleShowCapitalsMode;
}

export type CountryListActions =
	InitCountryListAction
	| InitCountryListSuccessAction
	| InitCapitalsCoordinatesAction
	| InitCapitalsCoordinatesDataAction
	| InitCapitalsCoordinatesDataSuccessAction
	| InitCountriesForestAreaAction
	| InitCountriesForestAreaDataAction
	| InitCountriesForestAreaDataSuccessAction
	| IsCountriesLoadingSuccessAction
	| SearchSubRegionCountriesAction
	| SearchCountryAction
	| SearchCountrySuccessAction
	| ToggleMapModeCountryListAction
	| ToggleShowCapitalsModeCountryListAction;
