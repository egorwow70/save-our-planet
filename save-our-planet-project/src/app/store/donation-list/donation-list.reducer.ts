import { Donation } from 'src/app/models/donation-list/donation';
import { donationListActionsType, DonationListActions } from './donation-list.actions';
import { Country } from 'src/app/models/country-list/country';

export interface IDonationListState {
	isLoading: boolean;
	isInitedDonationList: boolean;
	isInitedDonationListBeforRegistration: boolean;
	isInitedCountriesForDonation: boolean;
	isInitedUserDonationList: boolean;
	donationList: Donation[];
	beforeRegistrationUserDonationList: Donation[];
	countriesForDonation: Country[];
	userDonationList: Donation[];
}

export const donationListFeatureKey: 'DONATION-LIST' = 'DONATION-LIST';

const initialState: IDonationListState = {
	isLoading: true,
	isInitedDonationList: false,
	isInitedDonationListBeforRegistration: false,
	isInitedCountriesForDonation: false,
	isInitedUserDonationList: false,
	donationList: null,
	beforeRegistrationUserDonationList: null,
	countriesForDonation: null,
	userDonationList: null,
};

export function donationListReducer(
	state: IDonationListState = initialState,
	action: any
): IDonationListState {
	switch (action.type) {
		case donationListActionsType.initDonationList: {
			return {
				...state
			};
		}
		case donationListActionsType.InitDonationListSuccess: {
			return {
				...state,
				isLoading: false,
				isInitedDonationList: true,
				donationList: [...action.donationList].filter((donation: Donation) => Boolean(donation))
			};
		}
		case donationListActionsType.initNewUserDonationBeforeRegistration: {
			const newDonationListBeforeRegistration: Donation[] = (Boolean(state.beforeRegistrationUserDonationList)) ?
				[...state.beforeRegistrationUserDonationList, action.newDonation.clone()]
				: [action.newDonation.clone()];
			return {
				...state,
				isInitedDonationListBeforRegistration: true,
				beforeRegistrationUserDonationList: [...newDonationListBeforeRegistration]
			};
		}
		case donationListActionsType.makeDonation: {
			const newCurrentUserDonation: Donation = action.donation.clone();
			newCurrentUserDonation.id = action.userId;
			const newDonationList: Donation[] = (Boolean(state.donationList)) ?
				[...state.donationList, newCurrentUserDonation.clone()]
				: [newCurrentUserDonation.clone()];
			const newUserDonationList: Donation[] = (Boolean(state.userDonationList)) ?
				[...state.userDonationList, newCurrentUserDonation.clone()]
				: [newCurrentUserDonation.clone()];
			const newBeforeRegistrationUserDonationList: Donation[] = [...state.beforeRegistrationUserDonationList].filter((donation: Donation) => {
				if (!donation.equals(action.donation)) {
					return donation;
				}
			});
			const isInitedDonationListAfterMakeDonation: boolean = (Boolean(newBeforeRegistrationUserDonationList.length))
				? true : false;
			return {
				...state,
				donationList: [...newDonationList],
				userDonationList: [...newUserDonationList],
				beforeRegistrationUserDonationList: [...newBeforeRegistrationUserDonationList],
				isInitedDonationListBeforRegistration: isInitedDonationListAfterMakeDonation
			};
		}
		case donationListActionsType.deleteDonation: {
			const newBeforeRegistrationUserDonationList: Donation[] = [...state.beforeRegistrationUserDonationList].filter((donation: Donation) => {
				if (!donation.equals(action.donation)) {
					return donation;
				}
			});
			const isInitedDonationListAfterDeleteDonation: boolean = (Boolean(newBeforeRegistrationUserDonationList.length))
				? true
				: false;
			return {
				...state,
				beforeRegistrationUserDonationList: [...newBeforeRegistrationUserDonationList],
				isInitedDonationListBeforRegistration: isInitedDonationListAfterDeleteDonation
			};
		}
		case donationListActionsType.initNewCountryForDonation: {
			if (Boolean(state.countriesForDonation)) {
				return {
					...state,
					countriesForDonation: [...state.countriesForDonation, action.newCountry.clone()]
				};
			} else {
				return {
					...state,
					isInitedCountriesForDonation: true,
					countriesForDonation: [action.newCountry.clone()]
				};
			}
		}
		case donationListActionsType.deleteNewCountryForDonation: {
			const searchNewCountryList: Country[] = [...state.countriesForDonation].filter((country: Country) => {
				return !country.equals(action.newCountry);
			});
			if (Boolean(searchNewCountryList.length)) {
				return {
					...state,
					countriesForDonation: [...searchNewCountryList]
				};
			} else {
				return {
					...state,
					isInitedCountriesForDonation: false,
					countriesForDonation: null
				};
			}
		}
		case donationListActionsType.initDonationCurrentCountry: {
			const newBeforeRegistrationUserDonationList: Donation[] = [...state.beforeRegistrationUserDonationList].map((donation: Donation) => {
				if (donation.equals(action.donation)) {
					const newDonation: Donation = donation.clone();
					newDonation.country = action.country;
					return newDonation;
				} else {
					return donation;
				}
			});
			return {
				...state,
				isInitedCountriesForDonation: true,
				beforeRegistrationUserDonationList: [...newBeforeRegistrationUserDonationList]
			};
		}
		case donationListActionsType.initUserDonationList: {
			return {
				...state,
				userDonationList: [...state.donationList].filter((donation: Donation) => {
					if (donation.id === action.id) {
						return donation.clone();
					}
				})
			};
		}
		case donationListActionsType.initUserDonationListSuccess: {
			let isUserDonationListInited: boolean;
			if (Boolean(state.userDonationList)) {
				isUserDonationListInited = (Boolean(state.userDonationList.length))
					? true
					: false;
			}
			return {
				...state,
				isInitedUserDonationList: isUserDonationListInited
			};
		}
		default: {
			return {
				...state
			};
		}
	}
}

export function StateReducerDonationList(
	state: IDonationListState | undefined,
	action: DonationListActions
): IDonationListState {
	return donationListReducer(state, action);
}
