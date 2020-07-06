import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCountryList } from '../../store/country-list/country-list.selectors';
import { Country } from '../../models/country-list/country';

@Injectable()
export class CanProceedToRegionGuard implements CanActivate {

	private _countryList: Country[];

	constructor(
		private _store$: Store
	) { }

	private checkRouterParams(regionName: string, subRegionName: string): void {
		const currentRegionSubRegionCountry: Country = this._countryList.find((country: Country) => {
			if (Boolean(country)) {
				const currentCountryRegionName: string = country.region.split(' ')[0].toLowerCase();
				const currentCountrySubRegionName: string = country.subRegion.split(' ')[0].toLowerCase();
				if (currentCountryRegionName === regionName && currentCountrySubRegionName === subRegionName) {
					return country;
				}
			}
		});
		if (!Boolean(currentRegionSubRegionCountry)) {
			const errorMessage: string = `There are no countries in such region (${regionName}) and sub-region (${subRegionName})`;
			throw new Error(errorMessage);
		}
	}

	public canActivate(next: ActivatedRouteSnapshot): boolean {
		const currentRegion: string = next.params.regionName;
		const currentSubRegion: string = next.params.subRegionName;

		this._store$.select(selectCountryList)
			.subscribe((countryList: Country[]) => {
				this._countryList = countryList;
			}).unsubscribe();

		this.checkRouterParams(currentRegion, currentSubRegion);
		return true;
	}

}
