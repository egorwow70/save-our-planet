import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileDonationComponent } from '../user-profile-donation/user-profile-donation.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CanProceedToUserProfileGuard } from '../guards/user-list/can-proceed-to-user-profile.guard';
import { CanLeaveUserProfileGuard } from '../guards/user-list/can-leave-user-profile.guard';

@NgModule({
	declarations: [
		UserProfileComponent,
		UserProfileDonationComponent
	],
	imports: [
		UserProfileRoutingModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
	],
	providers: [
		CanProceedToUserProfileGuard,
		CanLeaveUserProfileGuard
	],
	bootstrap: [UserProfileComponent]
})
export class UserProfileModule {

}
