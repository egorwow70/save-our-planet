import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CountryMapComponent } from './country-map.component';

const routes: Routes = [
	{
		path: '',
		component: CountryMapComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CountryMapRoutingModule {

}
