import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Country } from '../../models/country-list/country';
import { selectCountryList } from '../../store/country-list/country-list.selectors';

@Injectable()
export class CanProceedToCountryGuard implements CanActivate {

	private _countryList: Country[];

	private _currentUrl: string;

	constructor(
		private _store$: Store
	) { }

	private takeNameOfRegionOrSubRegion(name: string): string {
		return name.toLowerCase().split(' ')[0];
	}

	private isExistRegionOrSubRegionRouteName(name: string): boolean {
		const currentCountryRegionOrSubRegionRouteName: string = this.takeNameOfRegionOrSubRegion(name);
		if (this._currentUrl.includes(currentCountryRegionOrSubRegionRouteName)) {
			return true;
		} else {
			return false;
		}
	}

	private checkCountry(countryRouterName: string): void {
		let isExistCurrentUrlCountry: boolean;
		const searchCountry: Country = this._countryList.find((country: Country) => {
			if (Boolean(country)) {
				const currentCountryRouterName: string = country.name.replace(/\./g, '')
					.replace(/\(|\)/g, '')
					.toLowerCase()
					.split(' ')
					.join('-');
				if (currentCountryRouterName === countryRouterName) {
					return country;
				}
			}
		});
		if (Boolean(searchCountry)) {
			isExistCurrentUrlCountry = this.isExistRegionOrSubRegionRouteName(searchCountry.region);
			isExistCurrentUrlCountry = this.isExistRegionOrSubRegionRouteName(searchCountry.subRegion);
		}
		if (!isExistCurrentUrlCountry) {
			const errorMessage: string = `There is no country with this name (${countryRouterName}) in this region and sub-region`;
			throw new Error(errorMessage);
		}
	}

	public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		this._currentUrl = state.url;
		const currentCountryName: string = next.params.countryName;
		this._store$.select(selectCountryList)
			.subscribe((countryList: Country[]) => {
				this._countryList = countryList;
				this.checkCountry(currentCountryName);
			}).unsubscribe();

		return true;
	}

}
