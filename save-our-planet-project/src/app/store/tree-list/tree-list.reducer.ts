import { Tree } from 'src/app/models/tree-list/tree';
import { TreeListActions, treeListActionsType } from './tree-list.actions';
import { Donation } from 'src/app/models/donation-list/donation';

export interface ITreeListState {
	isLoading: boolean;
	isInitedTrees: boolean;
	treeList: Tree[];
	treeCategoryTrees: Tree[];
	isSearchLoading: boolean;
	searchTree: Tree;
	isTreeRouterMode: boolean;
	isSelectedTree: boolean;
	selectedTreeProduct: Tree;
}

export const treeListFeatureKey: 'TREE-LIST' = 'TREE-LIST';

const initialState: ITreeListState = {
	isLoading: true,
	isInitedTrees: false,
	treeList: null,
	treeCategoryTrees: null,
	isSearchLoading: false,
	searchTree: null,
	isTreeRouterMode: false,
	isSelectedTree: false,
	selectedTreeProduct: null
};

export function treeListReducer(
	state: ITreeListState = initialState,
	action: any
): ITreeListState {
	switch (action.type) {
		case treeListActionsType.initTrees: {
			return {
				...state
			};
		}
		case treeListActionsType.initTreesSuccess: {
			return {
				...state,
				isInitedTrees: true,
				treeList: [...action.treeList].filter((tree: Tree) => Boolean(tree))
			};
		}
		case treeListActionsType.isTreesLoadingSuccess: {
			return {
				...state,
				isLoading: false
			};
		}
		case treeListActionsType.searchTreeCategoryTrees: {
			return {
				...state,
				treeCategoryTrees: [...state.treeList].filter((tree: Tree) => {
					if (tree.type === action.treeCategory) {
						return tree;
					}
				})
			};
		}
		case treeListActionsType.searchTree: {
			return {
				...state,
				isSearchLoading: true,
				searchTree: [...state.treeList].find((tree: Tree) => {
					const currentTreeRouterName: string = tree.name.replace(/\(|\)/g, '')
						.split(' ')
						.join('-')
						.toLowerCase();
					if (Boolean(tree) && action.name === currentTreeRouterName) {
						return tree;
					}
				})
			};
		}
		case treeListActionsType.searchTreeSuccess: {
			return {
				...state,
				isSearchLoading: false
			};
		}
		case treeListActionsType.treeRouterMode: {
			return {
				...state,
				isTreeRouterMode: true
			};
		}
		case treeListActionsType.goFromTreeRouterMode: {
			return {
				...state,
				isTreeRouterMode: false
			};
		}
		case treeListActionsType.isSelectedTreeForDonation: {
			if (Boolean(action.donationListBeforeRegistration)) {
				const selectedTreesForDonation: Tree[] = [...action.donationListBeforeRegistration].map((donation: Donation) => {
					return donation.treeDonation.tree.clone();
				});
				const currentTree: Tree = [...selectedTreesForDonation].find((tree: Tree) => {
					const treeRouteName: string = tree.name.replace(/\(|\)/g, '').toLowerCase().split(' ').join('-');
					if (treeRouteName === action.treeRouteName) {
						return tree.clone();
					}
				});
				if (Boolean(currentTree)) {
					return {
						...state,
						isSelectedTree: true
					};
				} else {
					return {
						...state,
						isSelectedTree: false
					};
				}
			} else {
				return {
					...state,
					isSelectedTree: false
				};
			}
		}
		case treeListActionsType.selectTreeProduct: {
			return {
				...state,
				selectedTreeProduct: action.treeProduct.clone()
			};
		}
		default: {
			return {
				...state
			};
		}
	}
}

export function StateReducerTreeList(
	state: ITreeListState | undefined,
	action: TreeListActions
): ITreeListState {
	return treeListReducer(state, action);
}
