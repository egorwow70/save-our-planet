import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
	selectDonationListBeforeRegistration,
	selectCountriesForDonation,
	selectIsInitedCountriesForDonation,
	selectIsInitedDonationListBeforeRegistration
} from '../store/donation-list/donation-list.selectors';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Donation } from '../models/donation-list/donation';
import { Country } from '../models/country-list/country';
import { Router } from '@angular/router';

@Component({
	selector: 'app-donation-list-before-registration',
	templateUrl: './donation-list-before-registration.component.html',
	styleUrls: ['./donation-list-before-registration.component.scss']
})
export class DonationListBeforeRegistrationComponent implements OnInit, OnDestroy {

	private _destroySubject$: Subject<boolean> = new Subject();

	public donationListBeforeRegistration: Donation[];
	public countriesForDonation: Country[];

	public isInitedDonationListBeforeRegistration: boolean;
	public isInitedCountriesForDonation: boolean;

	constructor(
		private _store$: Store,
		private _router: Router
	) { }

	public ngOnInit(): void {
		this._store$.select(selectDonationListBeforeRegistration)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((donationListBeforeRegistration: Donation[]) => {
				this.donationListBeforeRegistration = donationListBeforeRegistration;
			});
		this._store$.select(selectCountriesForDonation)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((countriesForDonation: Country[]) => {
				this.countriesForDonation = countriesForDonation;
			});

		this._store$.select(selectIsInitedDonationListBeforeRegistration)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((isInitedDonationListBeforeRegistration: boolean) => {
				this.isInitedDonationListBeforeRegistration = isInitedDonationListBeforeRegistration;
			});
		this._store$.select(selectIsInitedCountriesForDonation)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((isInitedCountriesForDonation: boolean) => {
				this.isInitedCountriesForDonation = isInitedCountriesForDonation;
			});
	}

	public ngOnDestroy(): void {
		this._destroySubject$.next(true);
		this._destroySubject$.complete();
	}

	public switchRouterToTreeList(): void {
		this._router.navigate(['trees']);
	}

	public switchRouterToCountryList(): void {
		this._router.navigate(['countries']);
	}

}
