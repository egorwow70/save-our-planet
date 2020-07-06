import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { TreeListDataService } from 'src/app/services/tree-data.service';
import { treeListActionsType, InitTreeListSuccessAction } from './tree-list.actions';
import { switchMap, map } from 'rxjs/operators';
import { Tree } from 'src/app/models/tree-list/tree';
import { Observable } from 'rxjs';

@Injectable()
export class TreeListEffects {
	constructor(
		private _actions$: Actions,
		private _treeListDataService: TreeListDataService
	) {

	}

	@Effect()
	public loadTreeList(): Observable<InitTreeListSuccessAction> {
		return this._actions$.pipe(
			ofType(treeListActionsType.initTrees),
			switchMap(() => this._treeListDataService.loadTreeList()
				.pipe(
					map((treeList: Tree[]) => {
						return new InitTreeListSuccessAction({ treeList });
					})
				)
			)
		);
	}

}
