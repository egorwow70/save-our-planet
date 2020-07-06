import { Country } from 'src/app/models/country-list/country';
import { Capital } from 'src/app/models/country-list/capital';
import { countryListActionsType, CountryListActions } from './country-list.actions';
import { CountryCapitalInterface } from 'src/app/models/country-list/country-capital-interface';
import { CountryForestAreaInterface } from 'src/app/models/country-list/country-forest-area-interface';

export interface ICountryListState {
	isLoading: boolean;
	isSearchLoading: boolean;
	isInitedCountries: boolean;
	isInitedCapitalsCoordinatesData: boolean;
	isInitedCountriesForestAreaData: boolean;
	isMapMode: boolean;
	isGlobeMode: boolean;
	isShowCapitalsMode: boolean;
	countryList: Country[];
	capitalsCoordinatesData: CountryCapitalInterface[];
	countriesForestAreaData: CountryForestAreaInterface[];
	subRegionsCountries: Country[];
	searchPreviousCountry: Country;
	searchCountry: Country;
	searchNextCountry: Country;
}

export const countryListFeatureKey: 'COUNTRY-LIST' = 'COUNTRY-LIST';

const initialState: ICountryListState = {
	isLoading: true,
	isSearchLoading: false,
	isInitedCountries: false,
	isInitedCapitalsCoordinatesData: false,
	isInitedCountriesForestAreaData: false,
	isMapMode: true,
	isGlobeMode: false,
	isShowCapitalsMode: true,
	countryList: null,
	capitalsCoordinatesData: null,
	countriesForestAreaData: null,
	subRegionsCountries: null,
	searchPreviousCountry: null,
	searchCountry: null,
	searchNextCountry: null
};

export function countryListReducer(
	state: ICountryListState = initialState,
	action: any
): ICountryListState {
	switch (action.type) {
		case countryListActionsType.initCountries: {
			return {
				...state
			};
		}
		case countryListActionsType.initCountriesSuccess: {
			return {
				...state,
				isInitedCountries: true,
				countryList: [...action.countryList].filter((country: Country) => Boolean(country))
			};
		}
		case countryListActionsType.initCapitalsCoordinatesData: {
			return {
				...state
			};
		}
		case countryListActionsType.initCapitalsCoordinatesDataSuccess: {
			return {
				...state,
				isInitedCapitalsCoordinatesData: true,
				capitalsCoordinatesData: [...action.capitalsCoordinatesData].filter((capital: Capital) => {
					if (Boolean(capital)) {
						return {
							latitude: capital.latitude,
							longitude: capital.longitude,
							name: capital.name
						};
					}
				})
			};
		}
		case countryListActionsType.initCapitalsCoordinates: {
			return {
				...state,
				countryList: [...state.capitalsCoordinatesData].filter(Boolean).map((capital: Capital) => {
					if (Boolean(capital)) {
						const currentCountry: Country = state.countryList.find((country: Country) => {
							return country.capital.name === capital.name;
						});
						if (Boolean(currentCountry)) {
							const newCountry: Country = currentCountry.clone();
							newCountry.capital = capital.clone();
							return newCountry;
						}
					}
				})
			};
		}
		case countryListActionsType.initCountriesForestAreaData: {
			return {
				...state
			};
		}
		case countryListActionsType.initCountriesForestAreaDataSuccess: {
			return {
				...state,
				isInitedCountriesForestAreaData: true,
				countriesForestAreaData: [...action.countriesForestAreaData]
					.filter((forestArea: CountryForestAreaInterface) => Boolean(forestArea))
			};
		}
		case countryListActionsType.initCountriesForestArea: {
			return {
				...state,
				countryList: [...state.countriesForestAreaData].filter(Boolean).map((forestArea: CountryForestAreaInterface) => {
					if (Boolean(forestArea)) {
						const currentCountry: Country = state.countryList.find((country: Country) => country.id === forestArea.id);
						if (Boolean(currentCountry)) {
							const newCountry: Country = currentCountry.clone();
							newCountry.forestArea = Number(forestArea.value);
							return newCountry;
						}
					}
				})
			};
		}
		case countryListActionsType.isCountriesLoadingSuccess: {
			return {
				...state,
				isLoading: false
			};
		}
		case countryListActionsType.searchSubRegionCountries: {
			const currentRegionCountries: Country[] = [...state.countryList].filter((country: Country) => {
				if (Boolean(country)) {
					if (country.region.toLowerCase() === action.regionName) {
						return country;
					}
				}
			});
			return {
				...state,
				subRegionsCountries: [...currentRegionCountries].filter((country: Country) => {
					if (Boolean(country)) {
						const countrySubRegionInfo: string[] = country.subRegion.toLowerCase().split(' ');
						if (countrySubRegionInfo[0] === action.subRegionName) {
							return country;
						}
					}
				})
			};
		}
		case countryListActionsType.searchCountry: {
			return {
				...state,
				isSearchLoading: true,
				searchCountry: [...state.subRegionsCountries].find((country: Country) => {
					if (Boolean(country)) {
						const currentCountryRouterName: string = country.name.replace(/\./g, '')
							.replace(/\(|\)/g, '')
							.toLowerCase()
							.split(' ')
							.join('-');
						if (action.name === currentCountryRouterName) {
							return country;
						}
					}
				})
			};
		}
		case countryListActionsType.searchCountrySuccess: {
			return {
				...state,
				isSearchLoading: false,
			};
		}
		case countryListActionsType.searchPreviousCountry: {
			const previousCountryIndex: number = [...state.subRegionsCountries].findIndex((country: Country) => {
				if (Boolean(country)) {
					const currentCountryRouterName: string = country.name.replace(/\./g, '')
						.replace(/\(|\)/g, '')
						.toLowerCase()
						.split(' ')
						.join('-');
					if (action.name === currentCountryRouterName) {
						return country;
					}
				}
			}) - 1;
			if (previousCountryIndex >= 0) {
				return {
					...state,
					searchPreviousCountry: state.subRegionsCountries[previousCountryIndex].clone()
				};
			} else {
				return {
					...state,
					searchPreviousCountry: null
				};
			}
		}
		case countryListActionsType.searchNextCountry: {
			const nextCountryIndex: number = [...state.subRegionsCountries].findIndex((country: Country) => {
				if (Boolean(country)) {
					const currentCountryRouterName: string = country.name.replace(/\./g, '')
						.replace(/\(|\)/g, '')
						.toLowerCase()
						.split(' ')
						.join('-');
					if (action.name === currentCountryRouterName) {
						return country;
					}
				}
			}) + 1;
			if (nextCountryIndex < state.subRegionsCountries.length) {
				return {
					...state,
					searchNextCountry: state.subRegionsCountries[nextCountryIndex].clone()
				};
			} else {
				return {
					...state,
					searchNextCountry: null
				};
			}
		}
		case countryListActionsType.toggleMapMode: {
			return {
				...state,
				isMapMode: !state.isMapMode,
				isGlobeMode: !state.isGlobeMode
			};
		}
		case countryListActionsType.toggleShowCapitalsMode: {
			return {
				...state,
				isShowCapitalsMode: !state.isShowCapitalsMode,
			};
		}
		default: {
			return {
				...state
			};
		}
	}
}

export function StateReducerCountryList(
	state: ICountryListState | undefined,
	action: CountryListActions
): ICountryListState {
	return countryListReducer(state, action);
}
