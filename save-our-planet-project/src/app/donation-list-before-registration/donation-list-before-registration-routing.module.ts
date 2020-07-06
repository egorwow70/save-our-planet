import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DonationListBeforeRegistrationComponent } from './donation-list-before-registration.component';

const routes: Routes = [
	{
		path: '',
		component: DonationListBeforeRegistrationComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DonationListBeforeRegistrationRoutingModule {

}
