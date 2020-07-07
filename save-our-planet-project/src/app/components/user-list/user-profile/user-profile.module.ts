import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileDonationComponent } from '../user-profile-donation/user-profile-donation.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CanProceedToUserProfileGuard } from 'src/app/guards/user-list/can-proceed-to-user-profile.guard';
import { CanLeaveUserProfileGuard } from 'src/app/guards/user-list/can-leave-user-profile.guard';
import { FormatUserProfileTreeAmountPipe } from 'src/app/pipes/user-list/format-user-profile-tree-amount.pipe';
import { FormatUserMedicalPointsPipe } from 'src/app/pipes/user-list/format-user-medical-points.pipe';
import { FormatUserAgePipe } from 'src/app/pipes/user-list/format-user-age.pipe';

@NgModule({
	declarations: [
		UserProfileComponent,
		UserProfileDonationComponent,
		FormatUserProfileTreeAmountPipe,
		FormatUserMedicalPointsPipe,
		FormatUserAgePipe
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
