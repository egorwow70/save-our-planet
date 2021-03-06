import { Component, OnInit, Input } from '@angular/core';
import { Donation } from 'src/app/models/donation-list/donation';
import { FacadeServiceDonationList } from 'src/app/store/donation-list/donation-list.facade';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/store/user-list/user-list.selectors';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user-list/user';
import { Router } from '@angular/router';
import { Country } from 'src/app/models/country-list/country';
import { selectCountriesForDonation } from 'src/app/store/donation-list/donation-list.selectors';
import { FacadeServiceUserList } from 'src/app/store/user-list/user-list.facade';
import { FacadeServiceCountryList } from 'src/app/store/country-list/country-list.facade';
@Component({
	selector: 'app-donation-before-registration',
	templateUrl: './donation-before-registration.component.html',
	styleUrls: ['./donation-before-registration.component.scss']
})
export class DonationBeforeRegistrationComponent implements OnInit {

	private _destroySubject$: Subject<boolean> = new Subject();

	private _currentDonationUser: User;

	@Input()
	public donation: Donation;

	public donationDetailsMode: boolean;

	public countriesForDonation: Country[];
	public selectCountryMode: boolean;

	public isChoosenCountry: boolean;

	constructor(
		private _store$: Store,
		private _router: Router,
		private _facadeDonationListService: FacadeServiceDonationList,
		private _facadeUserListService: FacadeServiceUserList,
		private _facadeCountryListService: FacadeServiceCountryList,
	) { }

	private findCurrentSelectedCountry(countryName: string): Country {
		return this.countriesForDonation.find((country: Country) => country.name === countryName);
	}

	private canMakeDonation(): void {
		if (Boolean(this.donation) && Boolean(this.donation.country)) {
			this.isChoosenCountry = true;
		}
	}

	public ngOnInit(): void {
		this.canMakeDonation();

		this._store$.select(selectUser)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((user: User) => {
				this._currentDonationUser = user;
			});
		this._store$.select(selectCountriesForDonation)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((countriesForDonation: Country[]) => {
				this.countriesForDonation = countriesForDonation;
			});
	}

	public toggleDonationDetailsMode(): void {
		this.donationDetailsMode = !this.donationDetailsMode;
	}

	public makeDonation(): void {
		if (Boolean(this._currentDonationUser)) {
			this._facadeDonationListService.makeDonation(this.donation, this._currentDonationUser.id);
			this._facadeCountryListService.countCountryForestArea(this.donation);
			this._facadeUserListService.addMedicalPointsForCurrentUser(this.donation.treeDonation.cost);
		} else {
			this._router.navigate([
				'/registration',
				'mode',
				'login-mode'
			]);
		}
	}

	public deleteDonation(): void {
		this._facadeDonationListService.deleteDonation(this.donation);
	}

	public toggleSelectCountryMode(): void {
		this.selectCountryMode = !this.selectCountryMode;
	}

	public selectCountry(countryNameTitle: HTMLElement): void {
		const selectedCountryName: string = countryNameTitle.innerText;
		const selectedCountry: Country = this.findCurrentSelectedCountry(selectedCountryName);
		this._facadeDonationListService.initDonationCurrentCountry(this.donation, selectedCountry);
	}

}
