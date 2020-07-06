import {
	createFeatureSelector,
	createSelector,
	DefaultProjectorFn,
	MemoizedSelector
} from '@ngrx/store';
import { IDonationStatisticListState, donationStatisticListFeatureKey } from './donation-statistic-list.reducer';
import { DonationStatisticInterface } from 'src/app/models/donation-statistic-list/donation-statistic-interface';

export const selectStateDonationStatisticList: MemoizedSelector<
	object,
	IDonationStatisticListState,
	DefaultProjectorFn<IDonationStatisticListState>
> = createFeatureSelector<IDonationStatisticListState>(donationStatisticListFeatureKey);

export const selectStatisticData: MemoizedSelector<
	object,
	DonationStatisticInterface[],
	DefaultProjectorFn<DonationStatisticInterface[]>
> = createSelector(
	selectStateDonationStatisticList,
	(state: IDonationStatisticListState): DonationStatisticInterface[] => state.statisticData
);

export const selectIsInitedStatisticDataByCost: MemoizedSelector<
	object,
	boolean,
	DefaultProjectorFn<boolean>
> = createSelector(
	selectStateDonationStatisticList,
	(state: IDonationStatisticListState): boolean => state.isInitedStatisticDataByCost
);

export const selectIsInitedStatisticDataByTree: MemoizedSelector<
	object,
	boolean,
	DefaultProjectorFn<boolean>
> = createSelector(
	selectStateDonationStatisticList,
	(state: IDonationStatisticListState): boolean => state.isInitedStatisticDataByTree
);

export const selectIsStatisticDataSortedByIncrease: MemoizedSelector<
	object,
	boolean,
	DefaultProjectorFn<boolean>
> = createSelector(
	selectStateDonationStatisticList,
	(state: IDonationStatisticListState): boolean => state.isSortedByIncrease
);

export const selectIsStatisticDataSortedByDecrease: MemoizedSelector<
	object,
	boolean,
	DefaultProjectorFn<boolean>
> = createSelector(
	selectStateDonationStatisticList,
	(state: IDonationStatisticListState): boolean => state.isSortedByDecrease
);

export const selectIsInitedAllDataStatistic: MemoizedSelector<
	object,
	boolean,
	DefaultProjectorFn<boolean>
> = createSelector(
	selectStateDonationStatisticList,
	(state: IDonationStatisticListState): boolean => state.isInitedAllDataStatistic
);

export const selectIsInitedTopTenDataStatistic: MemoizedSelector<
	object,
	boolean,
	DefaultProjectorFn<boolean>
> = createSelector(
	selectStateDonationStatisticList,
	(state: IDonationStatisticListState): boolean => state.isInitedTopTenDataStatistic
);
