import { Injectable } from '@angular/core';
import { Donation } from 'src/app/models/donation-list/donation';
import { Store } from '@ngrx/store';
import {
	InitNewUserDonationBeforeRegistrationAction,
	MakeDonationAction,
	DeleteDonationAction,
	InitNewCountryForDonationAction,
	InitDonationCurrentCountryAction,
	InitUserDonationListAction,
	InitUserDonationListSuccessAction,
	InitDonationListAction,
	DeleteNewCountryForDonationAction,
} from './donation-list.actions';
import { Country } from 'src/app/models/country-list/country';

@Injectable()
export class FacadeServiceDonationList {

	constructor(
		private _store$: Store,
	) { }

	public initNewUserDonationBeforeRegistration(donation: Donation): void {
		this._store$.dispatch(new InitNewUserDonationBeforeRegistrationAction({ donation }));
	}

	public makeDonation(donation: Donation, userId: string): void {
		this._store$.dispatch(new MakeDonationAction({ donation, userId }));
	}

	public deleteDonation(donation: Donation): void {
		this._store$.dispatch(new DeleteDonationAction({ donation }));
	}

	public initNewCountryForDonation(country: Country): void {
		this._store$.dispatch(new InitNewCountryForDonationAction({ country }));
	}

	public initDonationCurrentCountry(donation: Donation, country: Country): void {
		this._store$.dispatch(new InitDonationCurrentCountryAction({ donation, country }));
	}

	public initUserDonationList(id: string): void {
		this._store$.dispatch(new InitUserDonationListAction({ id }));
	}

	public initUserDonationListSuccess(): void {
		this._store$.dispatch(new InitUserDonationListSuccessAction());
	}

	public initDonationList(): void {
		this._store$.dispatch(new InitDonationListAction());
	}

	public deleteNewCountryForDonation(country: Country): void {
		this._store$.dispatch(new DeleteNewCountryForDonationAction({ country }));
	}

}
