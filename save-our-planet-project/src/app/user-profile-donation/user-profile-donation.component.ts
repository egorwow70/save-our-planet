import { Component, Input } from '@angular/core';
import { Donation } from '../models/donation-list/donation';

@Component({
	selector: 'app-user-profile-donation',
	templateUrl: './user-profile-donation.component.html',
	styleUrls: ['./user-profile-donation.component.scss']
})
export class UserProfileDonationComponent {

	@Input()
	public donation: Donation;

	// tslint:disable-next-line: no-empty
	constructor() { }

}
