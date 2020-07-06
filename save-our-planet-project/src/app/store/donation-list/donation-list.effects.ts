import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { InitDonationListSuccessAction, donationListActionsType } from './donation-list.actions';
import { switchMap, map } from 'rxjs/operators';
import { Donation } from 'src/app/models/donation-list/donation';
import { DonationListDataService } from 'src/app/services/donation-list-data.service';
import { Observable } from 'rxjs';

@Injectable()
export class DonationListEffects {
	constructor(
		private _actions$: Actions,
		private _donationListDataService: DonationListDataService
	) {

	}

	@Effect()
	public loadDonationList(): Observable<InitDonationListSuccessAction> {
		return this._actions$.pipe(
			ofType(donationListActionsType.initDonationList),
			switchMap(() => this._donationListDataService.loadDonationList()
				.pipe(
					map((donationList: Donation[]) => {
						return new InitDonationListSuccessAction({ donationList });
					})
				)
			)
		);
	}

}
