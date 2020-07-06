import { ICountryListState, countryListFeatureKey } from './country-list.reducer';
import {
	createFeatureSelector,
	createSelector,
	MemoizedSelector,
	DefaultProjectorFn
} from '@ngrx/store';
import { Country } from 'src/app/models/country-list/country';
import { CountryCapitalInterface } from 'src/app/models/country-list/country-capital-interface';
import { CountryForestAreaInterface } from 'src/app/models/country-list/country-forest-area-interface';

export const selectStateCountryList: MemoizedSelector<
	object, ICountryListState,
	DefaultProjectorFn<ICountryListState>
> = createFeatureSelector<ICountryListState>(countryListFeatureKey);

export const selectCountryListIsLoading: MemoizedSelector<
	object,
	boolean,
	DefaultProjectorFn<boolean>
> = createSelector(
	selectStateCountryList,
	(state: ICountryListState): boolean => state.isLoading
);

export const selectCountryList: MemoizedSelector<
	object,
	Country[],
	DefaultProjectorFn<Country[]>
> = createSelector(
	selectStateCountryList,
	(state: ICountryListState): Country[] => state.countryList
);

export const selectCountryListIsInitedCountries: MemoizedSelector<
	object,
	boolean,
	DefaultProjectorFn<boolean>
> = createSelector(
	selectStateCountryList,
	(state: ICountryListState): boolean => state.isInitedCountries
);

export const selectCountriesForestAreaData: MemoizedSelector<
	object,
	CountryForestAreaInterface[],
	DefaultProjectorFn<CountryForestAreaInterface[]>
> = createSelector(
	selectStateCountryList,
	(state: ICountryListState): CountryForestAreaInterface[] => state.countriesForestAreaData
);

export const selectIsInitedCountriesForestAreaData: MemoizedSelector<
	object,
	boolean,
	DefaultProjectorFn<boolean>
> = createSelector(
	selectStateCountryList,
	(state: ICountryListState): boolean => state.isInitedCountriesForestAreaData
);

export const selectCapitalsCoordinatesData: MemoizedSelector<
	object,
	CountryCapitalInterface[],
	DefaultProjectorFn<CountryCapitalInterface[]>
> = createSelector(
	selectStateCountryList,
	(state: ICountryListState): CountryCapitalInterface[] => state.capitalsCoordinatesData
);

export const selectIsInitedCapitalsCoordinatesData: MemoizedSelector<
	object,
	boolean,
	DefaultProjectorFn<boolean>
> = createSelector(
	selectStateCountryList,
	(state: ICountryListState): boolean => state.isInitedCapitalsCoordinatesData
);

export const selectSubRegionsCountries: MemoizedSelector<
	object,
	Country[],
	DefaultProjectorFn<Country[]>
> = createSelector(
	selectStateCountryList,
	(state: ICountryListState): Country[] => state.subRegionsCountries
);

export const selectSearchCountry: MemoizedSelector<
	object,
	Country,
	DefaultProjectorFn<Country>
> = createSelector(
	selectStateCountryList,
	(state: ICountryListState): Country => state.searchCountry
);

export const selectSearchPreviousCountry: MemoizedSelector<
	object,
	Country,
	DefaultProjectorFn<Country>
> = createSelector(
	selectStateCountryList,
	(state: ICountryListState): Country => state.searchPreviousCountry
);

export const selectSearchNextCountry: MemoizedSelector<
	object,
	Country,
	DefaultProjectorFn<Country>
> = createSelector(
	selectStateCountryList,
	(state: ICountryListState): Country => state.searchNextCountry
);

export const selectIsCountrySearchLoading: MemoizedSelector<
	object,
	boolean,
	DefaultProjectorFn<boolean>
> = createSelector(
	selectStateCountryList,
	(state: ICountryListState): boolean => state.isSearchLoading
);

export const selectIsMapMode: MemoizedSelector<
	object,
	boolean,
	DefaultProjectorFn<boolean>
> = createSelector(
	selectStateCountryList,
	(state: ICountryListState): boolean => state.isMapMode
);

export const selectIsGlobeMode: MemoizedSelector<
	object,
	boolean,
	DefaultProjectorFn<boolean>
> = createSelector(
	selectStateCountryList,
	(state: ICountryListState): boolean => state.isGlobeMode
);

export const selectIsShowCapitalsMode: MemoizedSelector<
	object,
	boolean,
	DefaultProjectorFn<boolean>
> = createSelector(
	selectStateCountryList,
	(state: ICountryListState): boolean => state.isShowCapitalsMode
);
