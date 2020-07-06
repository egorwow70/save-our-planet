import { ITreeListState, treeListFeatureKey } from './tree-list.reducer';
import {
	createFeatureSelector,
	createSelector,
	MemoizedSelector,
	DefaultProjectorFn
} from '@ngrx/store';
import { Tree } from 'src/app/models/tree-list/tree';

export const selectStateTreeList: MemoizedSelector<
	object,
	ITreeListState,
	DefaultProjectorFn<ITreeListState>
> = createFeatureSelector<ITreeListState>(treeListFeatureKey);

export const selectTreeListIsLoading: MemoizedSelector<
	object,
	boolean,
	DefaultProjectorFn<boolean>
> = createSelector(
	selectStateTreeList,
	(state: ITreeListState): boolean => state.isLoading
);

export const selectTreeList: MemoizedSelector<
	object,
	Tree[],
	DefaultProjectorFn<Tree[]>
> = createSelector(
	selectStateTreeList,
	(state: ITreeListState): Tree[] => state.treeList
);

export const selectIsInitedTrees: MemoizedSelector<
	object,
	boolean,
	DefaultProjectorFn<boolean>
> = createSelector(
	selectStateTreeList,
	(state: ITreeListState): boolean => state.isInitedTrees
);

export const selectTreeCategoryTrees: MemoizedSelector<
	object,
	Tree[],
	DefaultProjectorFn<Tree[]>
> = createSelector(
	selectStateTreeList,
	(state: ITreeListState): Tree[] => state.treeCategoryTrees
);

export const selectSearchTree: MemoizedSelector<
	object,
	Tree,
	DefaultProjectorFn<Tree>
> = createSelector(
	selectStateTreeList,
	(state: ITreeListState): Tree => state.searchTree
);

export const selectIsTreeSearchLoading: MemoizedSelector<
	object,
	boolean,
	DefaultProjectorFn<boolean>
> = createSelector(
	selectStateTreeList,
	(state: ITreeListState): boolean => state.isSearchLoading
);

export const selectIsTreeRouterModeAction: MemoizedSelector<
	object,
	boolean,
	DefaultProjectorFn<boolean>
> = createSelector(
	selectStateTreeList,
	(state: ITreeListState): boolean => state.isTreeRouterMode
);
