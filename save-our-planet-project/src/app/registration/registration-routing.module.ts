import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegistrationComponent } from '../registration/registration.component';
import { CanLeaveRegistrationGuard } from '../guards/user-list/can-leave-registration.guard';
import { CanProceedToRegistrationGuard } from '../guards/user-list/can-proceed-to-registration.guard';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'mode/login-mode'
	},
	{
		path: 'mode/:registrationMode',
		component: RegistrationComponent,
		canActivate: [CanProceedToRegistrationGuard],
		canDeactivate: [CanLeaveRegistrationGuard]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class RegistrationRoutingModule {

}
