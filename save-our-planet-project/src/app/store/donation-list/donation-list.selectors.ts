import {
	createFeatureSelector,
	createSelector,
	DefaultProjectorFn,
	MemoizedSelector
} from '@ngrx/store';
import { IDonationListState, donationListFeatureKey } from './donation-list.reducer';
import { Donation } from 'src/app/models/donation-list/donation';
import { Country } from 'src/app/models/country-list/country';

export const selectStateDonationList: MemoizedSelector<
	object,
	IDonationListState,
	DefaultProjectorFn<IDonationListState>
> = createFeatureSelector<IDonationListState>(donationListFeatureKey);

export const selectDonationListBeforeRegistration: MemoizedSelector<
	object,
	Donation[],
	DefaultProjectorFn<Donation[]>
> = createSelector(
	selectStateDonationList,
	(state: IDonationListState): Donation[] => state.beforeRegistrationUserDonationList
);

export const selectCountriesForDonation: MemoizedSelector<
	object,
	Country[],
	DefaultProjectorFn<Country[]>
> = createSelector(
	selectStateDonationList,
	(state: IDonationListState): Country[] => state.countriesForDonation
);

export const selectIsInitedDonationListBeforeRegistration: MemoizedSelector<
	object,
	boolean,
	DefaultProjectorFn<boolean>
> = createSelector(
	selectStateDonationList,
	(state: IDonationListState): boolean => state.isInitedDonationListBeforRegistration
);

export const selectIsInitedCountriesForDonation: MemoizedSelector<
	object,
	boolean,
	DefaultProjectorFn<boolean>
> = createSelector(
	selectStateDonationList,
	(state: IDonationListState): boolean => state.isInitedCountriesForDonation
);

export const selectDonationList: MemoizedSelector<
	object,
	Donation[],
	DefaultProjectorFn<Donation[]>
> = createSelector(
	selectStateDonationList,
	(state: IDonationListState): Donation[] => state.donationList
);

export const selectUserDonationList: MemoizedSelector<
	object,
	Donation[],
	DefaultProjectorFn<Donation[]>
> = createSelector(
	selectStateDonationList,
	(state: IDonationListState): Donation[] => state.userDonationList
);

export const selectIsInitedUserDonationList: MemoizedSelector<
	object,
	boolean,
	DefaultProjectorFn<boolean>
> = createSelector(
	selectStateDonationList,
	(state: IDonationListState): boolean => state.isInitedUserDonationList
);
