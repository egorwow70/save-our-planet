import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { Country } from '../models/country-list/country';
import { map, delay } from 'rxjs/operators';
import { Capital } from '../models/country-list/capital';
import { CapitalListSnapshot } from '../models/country-list/capital-list-snapshot';

@Injectable()
export class CountryListDataService {

	private static countryListLSKey: string = '-app-country-list';

	private _baseUrl: string = 'assets';
	private _countryUrl: string = 'https://restcountries.eu/rest/v2/all';

	constructor(
		private _httpClient: HttpClient
	) {

	}

	public loadCountriesList(): Observable<Country[]> {
		return this._httpClient.get<any>(this._countryUrl)
			.pipe(
				map((json: any) => {
					return (json || []).filter(Boolean).map(Country.fromJSON);
				})
			);
	}

	public loadCapitalsCoordinatesData(countryList: Country[]): any {
		const LSData: string = localStorage.getItem(CountryListDataService.countryListLSKey);
		if (Boolean(LSData)) {
			return of([...(CapitalListSnapshot.fromJSON(JSON.parse(LSData))).capitalList]);
		} else {
			const countryList$: Array<Observable<any>> = [...countryList].map((currentCountry: Country) => {
				const currentCountryCapitalName: string = currentCountry.capital.name;
				if (Boolean(currentCountryCapitalName)) {
					return this._httpClient.get<any>(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=cf12cc60-e991-460b-8057-553e3de62bf8&geocode=${currentCountryCapitalName}`)
						.pipe(
							map((json: any) => {
								const newCountry: Country = currentCountry.clone();
								if (Boolean(json.response.GeoObjectCollection.featureMember[0])) {
									if (json.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos) {
										const location: string = json.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
										const coordinates: string[] = location.split(' ');
										const newCountryCapitalName: string = newCountry.capital.name;
										if (Boolean(coordinates[0]) && Boolean(coordinates[1]) && Boolean(newCountryCapitalName)) {
											return new Capital(
												Number(coordinates[1]),
												Number(coordinates[0]),
												newCountryCapitalName
											);
										}
									}
								}
							})
						);
				} else {
					return of(null);
				}
			});
			return forkJoin([...countryList$]);
		}
	}

	public loadCountriesForestAreaData(): Observable<any> {
		const loadForestAreaDataDelay: number = 5500;
		return this._httpClient.get<any>(`${this._baseUrl}/countries-forest-data.json`)
			.pipe(
				delay(loadForestAreaDataDelay),
				map((json: any) => {
					return (json || []).filter(Boolean).map((forestAreaObject: any) => {
						return {
							id: `${forestAreaObject.id}`,
							value: Number(forestAreaObject.value)
						};
					});
				})
			);
	}

	public saveCapitalsCoordinatesData(capitalListSnapshot: CapitalListSnapshot): void {
		localStorage.setItem(
			CountryListDataService.countryListLSKey,
			JSON.stringify(
				CapitalListSnapshot.toJSON(capitalListSnapshot)
			)
		);
	}
}
