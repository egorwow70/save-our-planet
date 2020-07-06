import { donationStatisticListActionsType, DonationStatisticListActions } from './donation-statistic-list.actions';
import { User } from 'src/app/models/user-list/user';
import { Donation } from 'src/app/models/donation-list/donation';
import { DonationStatisticInterface } from 'src/app/models/donation-statistic-list/donation-statistic-interface';

export interface IDonationStatisticListState {
	isInitedUserList: boolean;
	isInitedDonationList: boolean;
	isInitedAllDataStatistic: boolean;
	isInitedTopTenDataStatistic: boolean;
	isInitedStatisticDataByCost: boolean;
	isInitedStatisticDataByTree: boolean;
	isSortedByIncrease: boolean;
	isSortedByDecrease: boolean;
	userList: User[];
	donationList: Donation[];
	statisticData: DonationStatisticInterface[];
}

export const donationStatisticListFeatureKey: 'DONATION-STATISTIC-LIST' = 'DONATION-STATISTIC-LIST';

const initialState: IDonationStatisticListState = {
	isInitedUserList: false,
	isInitedDonationList: false,
	isInitedAllDataStatistic: false,
	isInitedTopTenDataStatistic: false,
	isInitedStatisticDataByCost: false,
	isInitedStatisticDataByTree: false,
	isSortedByIncrease: false,
	isSortedByDecrease: false,
	userList: null,
	donationList: null,
	statisticData: null
};

export function donationStatisticListReducer(
	state: IDonationStatisticListState = initialState,
	action: any
): IDonationStatisticListState {
	switch (action.type) {
		case donationStatisticListActionsType.initUserList: {
			return {
				...state,
				userList: [...action.userList],
				isInitedUserList: true
			};
		}
		case donationStatisticListActionsType.initDonationList: {
			return {
				...state,
				donationList: [...action.donationList],
				isInitedDonationList: true
			};
		}
		case donationStatisticListActionsType.initAllDonatorsDataByCost: {
			const allDonatorsStatisticDataByCost: DonationStatisticInterface[] = [...state.userList].map((user: User) => {
				const space: string = ' ';
				const userFullName: string = user.name + space + user.surName;
				let userTotalDonationCost: number = 0;
				const userProfileImage: string = user.profileImage;
				[...state.donationList].map((donation: Donation) => {
					if (user.id === donation.id) {
						userTotalDonationCost += Number(donation.treeDonation.cost);
					}
				});
				if (Boolean(userTotalDonationCost)) {
					return {
						name: userFullName,
						points: userTotalDonationCost,
						bullet: userProfileImage
					};
				} else {
					return null;
				}
			}).filter((donator: DonationStatisticInterface) => Boolean(donator));
			return {
				...state,
				statisticData: [...allDonatorsStatisticDataByCost],
				isInitedAllDataStatistic: true,
				isInitedTopTenDataStatistic: false,
				isInitedStatisticDataByCost: true,
				isInitedStatisticDataByTree: false,
				isSortedByIncrease: false,
				isSortedByDecrease: false
			};
		}
		case donationStatisticListActionsType.initAllDonatorsDataByTree: {
			const allDonatorsStatisticDataByTree: DonationStatisticInterface[] = [...state.userList].map((user: User) => {
				const space: string = ' ';
				const userFullName: string = user.name + space + user.surName;
				let userTotalDonationTreeAmount: number = 0;
				const userProfileImage: string = user.profileImage;
				[...state.donationList].map((donation: Donation) => {
					if (user.id === donation.id) {
						userTotalDonationTreeAmount += Number(donation.treeDonation.amount);
					}
				});
				if (Boolean(userTotalDonationTreeAmount)) {
					return {
						name: userFullName,
						points: userTotalDonationTreeAmount,
						bullet: userProfileImage
					};
				} else {
					return null;
				}
			}).filter((donator: DonationStatisticInterface) => Boolean(donator));
			return {
				...state,
				statisticData: [...allDonatorsStatisticDataByTree],
				isInitedAllDataStatistic: true,
				isInitedTopTenDataStatistic: false,
				isInitedStatisticDataByCost: false,
				isInitedStatisticDataByTree: true,
				isSortedByIncrease: false,
				isSortedByDecrease: false
			};
		}
		case donationStatisticListActionsType.initTopTenDataStatistic: {
			const dataStatisticNumber: number = 11;
			return {
				...state,
				statisticData: [...state.statisticData].reverse()
					.slice(0, dataStatisticNumber).reverse(),
				isInitedAllDataStatistic: false,
				isInitedTopTenDataStatistic: true
			};
		}
		case donationStatisticListActionsType.sortTop: {
			return {
				...state,
				statisticData: [...state.statisticData].sort((
					statistic: DonationStatisticInterface,
					currentStatistic: DonationStatisticInterface
				) => {
					return (statistic.points > currentStatistic.points) ? 1 : -1;
				}),
				isSortedByIncrease: true,
				isSortedByDecrease: false
			};
		}
		case donationStatisticListActionsType.sortBottom: {
			return {
				...state,
				statisticData: [...state.statisticData].sort((
					statistic: DonationStatisticInterface,
					currentStatistic: DonationStatisticInterface
				) => {
					return (statistic.points > currentStatistic.points) ? -1 : 1;
				}),
				isSortedByIncrease: false,
				isSortedByDecrease: true
			};
		}
		case donationStatisticListActionsType.initAllCountriesDataByCost: {
			const uniqueCountryNameList: string[] = [];
			const donationsStatisticDataByTree: DonationStatisticInterface[] = [...state.donationList].map((donation: Donation) => {
				const takeNumberWordsInCountryName: number = 2;
				const currentCountryName: string = donation.country.name;
				const isCountryNameInUniqueCountryNameList: string[] = uniqueCountryNameList.filter((countryName: string) => {
					if (Boolean(countryName) && currentCountryName === countryName) {
						return countryName;
					}
				});
				if (!Boolean(isCountryNameInUniqueCountryNameList.length)) {
					uniqueCountryNameList.push(currentCountryName);
					const statisticCountryName: string = currentCountryName.split(' ').slice(0, takeNumberWordsInCountryName).join(' ');
					let currentCountryCostAmount: number = 0;
					[...state.donationList].map((currentDonation: Donation) => {
						if (currentDonation.country.name === currentCountryName) {
							currentCountryCostAmount += Number(currentDonation.treeDonation.cost);
						}
					});
					return {
						name: statisticCountryName,
						points: currentCountryCostAmount,
						bullet: donation.country.flag
					};
				}
			}).filter((donation: DonationStatisticInterface) => Boolean(donation));
			return {
				...state,
				statisticData: [...donationsStatisticDataByTree],
				isInitedAllDataStatistic: true,
				isInitedTopTenDataStatistic: false,
				isInitedStatisticDataByCost: true,
				isInitedStatisticDataByTree: false,
				isSortedByIncrease: false,
				isSortedByDecrease: false
			};
		}
		case donationStatisticListActionsType.initAllCountriesDataByTree: {
			const uniqueCountryNameList: string[] = [];
			const donationsStatisticDataByTree: DonationStatisticInterface[] = [...state.donationList].map((donation: Donation) => {
				const takeNumberWordsInCountryName: number = 2;
				const currentCountryName: string = donation.country.name;
				const isCountryNameInUniqueCountryNameList: string[] = uniqueCountryNameList.filter((countryName: string) => {
					if (Boolean(countryName) && currentCountryName === countryName) {
						return countryName;
					}
				});
				if (!Boolean(isCountryNameInUniqueCountryNameList.length)) {
					uniqueCountryNameList.push(currentCountryName);
					const statisticCountryName: string = currentCountryName.split(' ').slice(0, takeNumberWordsInCountryName).join(' ');
					let currentCountryTreeAmount: number = 0;
					[...state.donationList].map((currentDonation: Donation) => {
						if (currentDonation.country.name === currentCountryName) {
							currentCountryTreeAmount += Number(currentDonation.treeDonation.amount);
						}
					});
					return {
						name: statisticCountryName,
						points: currentCountryTreeAmount,
						bullet: donation.country.flag
					};
				}
			}).filter((donation: DonationStatisticInterface) => Boolean(donation));
			return {
				...state,
				statisticData: [...donationsStatisticDataByTree],
				isInitedAllDataStatistic: true,
				isInitedTopTenDataStatistic: false,
				isInitedStatisticDataByCost: false,
				isInitedStatisticDataByTree: true,
				isSortedByIncrease: false,
				isSortedByDecrease: false
			};
		}
		default: {
			return {
				...state
			};
		}
	}
}

export function StateReducerDonationStatisticList(
	state: IDonationStatisticListState | undefined,
	action: DonationStatisticListActions
): IDonationStatisticListState {
	return donationStatisticListReducer(state, action);
}
