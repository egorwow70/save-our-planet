import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
	SearchTreeAction,
	TreeRouterModeAction,
	SearchTreeSuccessAction,
	SearchTreeCategoryTreesAction,
	GoFromTreeRouterAction,
	InitTreeListAction,
	IsTreesLoadingSuccessAction,
	IsSelectedTreeForDonationAction
} from './tree-list.actions';
import { Donation } from 'src/app/models/donation-list/donation';

@Injectable()
export class FacadeServiceTreeList {

	constructor(
		private _store$: Store,
	) { }

	public searchTree(name: string): void {
		this._store$.dispatch(new SearchTreeAction({ name }));
	}

	public goToTreeRouterMode(): void {
		this._store$.dispatch(new TreeRouterModeAction());
	}

	public searchTreeSuccess(): void {
		this._store$.dispatch(new SearchTreeSuccessAction());
	}

	public searchTreeCategoryTrees(treeCategory: string): void {
		this._store$.dispatch(new SearchTreeCategoryTreesAction({ treeCategory }));
	}

	public goFromTreeRouter(): void {
		this._store$.dispatch(new GoFromTreeRouterAction());
	}

	public initTreeList(): void {
		this._store$.dispatch(new InitTreeListAction());
	}

	public treesLoadingSuccess(): void {
		this._store$.dispatch(new IsTreesLoadingSuccessAction());
	}

	public isSelectedTreeForDonation(treeRouteName: string, donationListBeforeRegistration: Donation[]): void {
		this._store$.dispatch(new IsSelectedTreeForDonationAction({ treeRouteName, donationListBeforeRegistration }));
	}

}
