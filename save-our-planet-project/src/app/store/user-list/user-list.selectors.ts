import { IUserListState, userListFeatureKey } from './user-list.reducer';
import {
	createFeatureSelector,
	createSelector,
	MemoizedSelector,
	DefaultProjectorFn
} from '@ngrx/store';
import { User } from 'src/app/models/user-list/user';

export const selectStateUserList: MemoizedSelector<
	object,
	IUserListState,
	DefaultProjectorFn<IUserListState>
> = createFeatureSelector<IUserListState>(userListFeatureKey);

export const selectUser: MemoizedSelector<
	object,
	User,
	DefaultProjectorFn<User>
> = createSelector(
	selectStateUserList,
	(state: IUserListState): User => state.user
);

export const selectUserList: MemoizedSelector<
	object,
	User[],
	DefaultProjectorFn<User[]>
> = createSelector(
	selectStateUserList,
	(state: IUserListState): User[] => state.userList
);
