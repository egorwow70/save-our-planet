import { userListActionsType, UserListActions } from './user-list.actions';
import { User } from 'src/app/models/user-list/user';

export interface IUserListState {
	isLoading: boolean;
	userList: User[];
	user: User;
}

export const userListFeatureKey: 'USER-LIST' = 'USER-LIST';

const initialState: IUserListState = {
	isLoading: true,
	userList: null,
	user: null
};

export function userListReducer(state: IUserListState = initialState, action: any): IUserListState {
	switch (action.type) {
		case userListActionsType.initUserList: {
			return {
				...state
			};
		}
		case userListActionsType.initUserListSuccess: {
			return {
				...state,
				isLoading: false,
				userList: [...action.userList]
			};
		}
		case userListActionsType.initUser: {
			return {
				...state,
				user: action.user.clone()
			};
		}
		case userListActionsType.initNewUser: {
			return {
				...state,
				userList: [...state.userList, action.user.clone()]
			};
		}
		case userListActionsType.initNewUserProfileImage: {
			const newUser: User = state.user.clone();
			newUser.profileImage = action.newImage;
			return {
				...state,
				user: newUser.clone()
			};
		}
		case userListActionsType.pickUpPointsFromUser: {
			const currentUser: User = [...state.userList].find((user: User) => user.id === action.userId).clone();
			currentUser.medicalPoints = currentUser.medicalPoints - action.medicalPoints;
			return {
				...state,
				userList: [...state.userList].map((user: User) => {
					if (user.id === action.userId) {
						return currentUser.clone();
					} else {
						return user.clone();
					}
				}),
				user: currentUser.clone()
			};
		}
		case userListActionsType.addMedicalPointsForCurrentUser: {
			const currentUser: User = state.user.clone();
			currentUser.medicalPoints = currentUser.medicalPoints + action.medicalPoints;
			return {
				...state,
				userList: [...state.userList].map((user: User) => {
					if (user.id === currentUser.id) {
						return currentUser.clone();
					} else {
						return user.clone();
					}
				}),
				user: currentUser.clone()
			};
		}
		default: {
			return {
				...state
			};
		}
	}
}

export function StateReducerUserList(
	state: IUserListState | undefined,
	action: UserListActions
): IUserListState {
	return userListReducer(state, action);
}
