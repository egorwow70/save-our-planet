import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { TreeType } from '../../models/tree-list/tree-type';

@Injectable()
export class CanProceedToTreeCategoryGuard implements CanActivate {

	private isExistTreeType(currentCategoryName: string): boolean {
		for (const treeType in TreeType) {
			if (currentCategoryName === TreeType[treeType]) {
				return true;
			}
		}
		return false;
	}

	public canActivate(next: ActivatedRouteSnapshot): boolean {
		const currentCategoryName: string = next.params.categoryName;
		const isTreeTypeExist: boolean = this.isExistTreeType(currentCategoryName);
		if (!isTreeTypeExist) {
			const errorMessage: string = `This tree category (${currentCategoryName}) does not exist! Try more!`;
			throw new Error(errorMessage);
		}
		return isTreeTypeExist;
	}

}
