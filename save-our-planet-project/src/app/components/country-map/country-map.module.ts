import { NgModule } from '@angular/core';
import { CountryMapComponent } from './country-map.component';
import { CommonModule } from '@angular/common';
import { CountryMapRoutingModule } from './country-map-routing.module';

@NgModule({
	declarations: [
		CountryMapComponent
	],
	imports: [
		CountryMapRoutingModule,
		CommonModule
	],
	providers: [],
	bootstrap: [CountryMapComponent]
})
export class CountryMapModule {

}
