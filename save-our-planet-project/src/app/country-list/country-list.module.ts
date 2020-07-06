import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryListComponent } from './country-list.component';
import { CountryListRoutingModule } from './country-list-routing.module';
import { CountryComponent } from '../country/country.component';
import { RegionComponent } from '../region/region.component';
import { CountryNameComponent } from '../country-name/country-name.component';
import { CanProceedToRegionGuard } from '../guards/country-list/can-proceed-to-region.guard';
import { CanProceedToCountryGuard } from '../guards/country-list/can-proceed-to-country.guard';
import { CanLeaveCountryGuard } from '../guards/country-list/can-leave-country.guard';
import { FormatForestAreaPipe } from '../pipes/country-list/format-forest-area.pipe';
import { FormatAreaPipe } from '../pipes/country-list/format-area.pipe';
import { FormatRegionTitlePipe } from '../pipes/country-list/format-region-title.pipe';

@NgModule({
	declarations: [
		CountryListComponent,
		CountryComponent,
		RegionComponent,
		CountryNameComponent,
		FormatForestAreaPipe,
		FormatAreaPipe,
		FormatRegionTitlePipe
	],
	imports: [
		CountryListRoutingModule,
		CommonModule
	],
	providers: [
		CanProceedToRegionGuard,
		CanProceedToCountryGuard,
		CanLeaveCountryGuard
	],
	bootstrap: [CountryListComponent]
})
export class CountryListModule {

}
