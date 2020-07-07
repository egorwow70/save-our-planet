import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CountryListComponent } from './country-list.component';
import { RegionComponent } from '../region/region.component';
import { CountryComponent } from '../country/country.component';
import { CanProceedToRegionGuard } from 'src/app/guards/country-list/can-proceed-to-region.guard';
import { CanProceedToCountryGuard } from 'src/app/guards/country-list/can-proceed-to-country.guard';
import { CanLeaveRegionGuard } from 'src/app/guards/country-list/can-leave-region.guard';

const routes: Routes = [
	{
		path: '',
		component: CountryListComponent
	},
	{
		path: 'region/:regionName/:subRegionName',
		component: RegionComponent,
		canActivate: [CanProceedToRegionGuard],
		canDeactivate: [CanLeaveRegionGuard],
		children: [{
			path: 'country/:countryName',
			component: CountryComponent,
			canActivate: [CanProceedToCountryGuard]
		}]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CountryListRoutingModule {

}
