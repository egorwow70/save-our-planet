import { ActionReducerMap } from '@ngrx/store';
import {
	countryListFeatureKey,
	StateReducerCountryList,
	ICountryListState
} from './country-list/country-list.reducer';
import {
	ITreeListState,
	StateReducerTreeList,
	treeListFeatureKey
} from './tree-list/tree-list.reducer';
import {
	IUserListState,
	StateReducerUserList,
	userListFeatureKey
} from './user-list/user-list.reducer';
import {
	IDonationListState,
	donationListFeatureKey,
	StateReducerDonationList
} from './donation-list/donation-list.reducer';
import {
	donationStatisticListFeatureKey,
	StateReducerDonationStatisticList,
	IDonationStatisticListState
} from './donation-statistic-list/donation-statistic-list.reducer';

export * from './country-list';
export * from './tree-list';
export * from './user-list';
export * from './donation-list';
export * from './donation-statistic-list';

export interface IAppState {
	[countryListFeatureKey]: ICountryListState;
	[treeListFeatureKey]: ITreeListState;
	[userListFeatureKey]: IUserListState;
	[donationListFeatureKey]: IDonationListState;
	[donationStatisticListFeatureKey]: IDonationStatisticListState;
}

export const reducers: ActionReducerMap<IAppState> = {
	[countryListFeatureKey]: StateReducerCountryList,
	[treeListFeatureKey]: StateReducerTreeList,
	[userListFeatureKey]: StateReducerUserList,
	[donationListFeatureKey]: StateReducerDonationList,
	[donationStatisticListFeatureKey]: StateReducerDonationStatisticList
};
