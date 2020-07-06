
import { DonationListBeforeRegistrationComponent } from './donation-list-before-registration.component';
import { DonationBeforeRegistrationComponent } from '../donation-before-registration/donation-before-registration.component';
import { NgModule } from '@angular/core';
import { DonationListBeforeRegistrationRoutingModule } from './donation-list-before-registration-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [
		DonationListBeforeRegistrationComponent,
		DonationBeforeRegistrationComponent,
	],
	imports: [
		DonationListBeforeRegistrationRoutingModule,
		CommonModule
	],
	providers: [],
	bootstrap: [DonationListBeforeRegistrationComponent]
})
export class DonationListBeforeRegistrationModule {

}
