import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectTreeList } from '../../store/tree-list/tree-list.selectors';
import { Tree } from '../../models/tree-list/tree';
import { TreeType } from '../../models/tree-list/tree-type';

@Injectable()
export class CanProceedToTreeGuard implements CanActivate {

	private _treeList: Tree[];

	private _currentUrl: string;

	constructor(
		private _store$: Store
	) { }

	private isExistTreeCategoryRouteName(treeType: string): boolean {
		let isExistTreeCategory: boolean;
		for (const currentTreeType in TreeType) {
			if (treeType === TreeType[currentTreeType]) {
				isExistTreeCategory = true;
			}
		}
		if (isExistTreeCategory && this._currentUrl.includes(treeType)) {
			return true;
		} else {
			return false;
		}
	}

	private checkTree(treeRouteName: string): void {
		let isExistCurrentUrlTree: boolean;
		const searchTree: Tree = this._treeList.find((tree: Tree) => {
			if (Boolean(tree)) {
				const currentTreeRouteName: string = tree.name.replace(/\(|\)/g, '')
					.toLowerCase()
					.split(' ')
					.join('-');
				if (treeRouteName === currentTreeRouteName) {
					return tree;
				}
			}
		});
		if (Boolean(searchTree)) {
			isExistCurrentUrlTree = this.isExistTreeCategoryRouteName(searchTree.type);
		}
		if (!isExistCurrentUrlTree) {
			const errorMessage: string = `There is no tree with this name (${treeRouteName})`;
			throw new Error(errorMessage);
		}
	}

	public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		this._currentUrl = state.url;
		const currentTreeRouteName: string = next.params.treeName;
		this._store$.select(selectTreeList)
			.subscribe((treeList: Tree[]) => {
				this._treeList = treeList;
				this.checkTree(currentTreeRouteName);
			}).unsubscribe();

		return true;
	}

}
