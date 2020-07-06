import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CountryListComponent } from './country-list.component';
import { RegionComponent } from '../region/region.component';
import { CountryComponent } from '../country/country.component';
import { CanProceedToRegionGuard } from '../guards/country-list/can-proceed-to-region.guard';
import { CanProceedToCountryGuard } from '../guards/country-list/can-proceed-to-country.guard';
import { CanLeaveCountryGuard } from '../guards/country-list/can-leave-country.guard';

const routes: Routes = [
	{
		path: '',
		component: CountryListComponent
	},
	{
		path: 'region/:regionName/:subRegionName',
		component: RegionComponent,
		canActivate: [CanProceedToRegionGuard],
		children: [{
			path: 'country/:countryName',
			component: CountryComponent,
			canActivate: [CanProceedToCountryGuard],
			canDeactivate: [CanLeaveCountryGuard]
		}]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CountryListRoutingModule {

}
