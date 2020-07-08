import { Action } from '@ngrx/store';
import { Tree } from 'src/app/models/tree-list/tree';
import { Donation } from 'src/app/models/donation-list/donation';

export enum treeListActionsType {
	initTrees = '[TREE-LIST/API] Init-Trees Tree-List',
	initTreesSuccess = '[TREE-LIST/API] Init-Trees-Success Tree-List',
	isTreesLoadingSuccess = '[TREE-LIST/API] Is-Loading-Success Tree-List',
	searchTreeCategoryTrees = '[TREE-LIST/API] Search-Tree-Category-Trees Tree-list',
	searchTree = '[TREE-LIST/API] Search-Tree Tree-List',
	searchTreeSuccess = '[TREE-LIST/API] Search-Tree-Success Tree-List',
	treeRouterMode = '[TREE-LIST/API] Tree-Router-Mode Tree-List',
	goFromTreeRouterMode = '[TREE-LIST/API] Go-From-Tree-Router-Mode Tree-List',
	isSelectedTreeForDonation = '[TREE-LIST/API] Is-Selected-Tree-For-Donation Tree-List',
	selectTreeProduct = '[COUNTRY-LIST/API] Select-Tree-Product Tree-List'
}

export class InitTreeListAction implements Action {
	public readonly type: string = treeListActionsType.initTrees;

}

// tslint:disable-next-line: max-classes-per-file
export class InitTreeListSuccessAction implements Action {
	public readonly type: string = treeListActionsType.initTreesSuccess;

	constructor(private _payload: {
		treeList: Tree[]
	}) { }

	public get treeList(): Tree[] {
		return this._payload.treeList;
	}
}

// tslint:disable-next-line: max-classes-per-file
export class IsTreesLoadingSuccessAction implements Action {
	public readonly type: string = treeListActionsType.isTreesLoadingSuccess;
}

// tslint:disable-next-line: max-classes-per-file
export class SearchTreeCategoryTreesAction implements Action {
	public readonly type: string = treeListActionsType.searchTreeCategoryTrees;

	constructor(private _payload: {
		treeCategory: string
	}) { }

	public get treeCategory(): string {
		return this._payload.treeCategory;
	}
}

// tslint:disable-next-line: max-classes-per-file
export class SearchTreeAction implements Action {
	public readonly type: string = treeListActionsType.searchTree;

	constructor(private _payload: {
		name: string
	}) { }

	public get name(): string {
		return this._payload.name;
	}
}

// tslint:disable-next-line: max-classes-per-file
export class SearchTreeSuccessAction implements Action {
	public readonly type: string = treeListActionsType.searchTreeSuccess;
}

// tslint:disable-next-line: max-classes-per-file
export class TreeRouterModeAction implements Action {
	public readonly type: string = treeListActionsType.treeRouterMode;
}

// tslint:disable-next-line: max-classes-per-file
export class GoFromTreeRouterAction implements Action {
	public readonly type: string = treeListActionsType.goFromTreeRouterMode;
}

// tslint:disable-next-line: max-classes-per-file
export class IsSelectedTreeForDonationAction implements Action {
	public readonly type: string = treeListActionsType.isSelectedTreeForDonation;

	constructor(private _payload: {
		treeRouteName: string,
		donationListBeforeRegistration: Donation[]
	}) { }

	public get treeRouteName(): string {
		return this._payload.treeRouteName;
	}

	public get donationListBeforeRegistration(): Donation[] {
		return this._payload.donationListBeforeRegistration;
	}
}

// tslint:disable-next-line: max-classes-per-file
export class SelectTreeProductAction implements Action {
	public readonly type: string = treeListActionsType.selectTreeProduct;

	constructor(private _payload: {
		treeProduct: Tree
	}) { }

	public get treeProduct(): Tree {
		return this._payload.treeProduct;
	}
}

export type TreeListActions =
	InitTreeListAction
	| InitTreeListSuccessAction
	| IsTreesLoadingSuccessAction
	| SearchTreeCategoryTreesAction
	| SearchTreeAction
	| SearchTreeSuccessAction
	| TreeRouterModeAction
	| GoFromTreeRouterAction
	| IsSelectedTreeForDonationAction
	| SelectTreeProductAction;
