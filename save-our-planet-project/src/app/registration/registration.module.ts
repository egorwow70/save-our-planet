import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RegistrationComponent } from '../registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationRoutingModule } from './registration-routing.module';
import { CanLeaveRegistrationGuard } from '../guards/user-list/can-leave-registration.guard';
import { CanProceedToRegistrationGuard } from '../guards/user-list/can-proceed-to-registration.guard';

@NgModule({
	declarations: [
		RegistrationComponent
	],
	imports: [
		RegistrationRoutingModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
	],
	providers: [
		CanProceedToRegistrationGuard,
		CanLeaveRegistrationGuard
	],
	bootstrap: [RegistrationComponent]
})
export class RegistrationModule {

}
