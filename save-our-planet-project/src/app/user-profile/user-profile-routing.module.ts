import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserProfileComponent } from './user-profile.component';
import { CanProceedToUserProfileGuard } from '../guards/user-list/can-proceed-to-user-profile.guard';
import { CanLeaveUserProfileGuard } from '../guards/user-list/can-leave-user-profile.guard';

const routes: Routes = [
	{
		path: '',
		component: UserProfileComponent,
		canActivate: [CanProceedToUserProfileGuard],
		canDeactivate: [CanLeaveUserProfileGuard]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UserProfileRoutingModule {

}
