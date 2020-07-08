import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeUntil, delay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectTreeCategoryTrees, selectIsTreeRouterModeAction, selectSelectedTreeProduct } from 'src/app/store/tree-list/tree-list.selectors';
import { Tree } from 'src/app/models/tree-list/tree';
import { FacadeServiceTreeList } from 'src/app/store/tree-list/tree-list.facade';
import { selectDonationListBeforeRegistration } from 'src/app/store/donation-list/donation-list.selectors';
import { Donation } from 'src/app/models/donation-list/donation';

@Component({
	selector: 'app-tree-category',
	templateUrl: './tree-category.component.html',
	styleUrls: ['./tree-category.component.scss', './tree-category-media.component.scss']
})
export class TreeCategoryComponent implements OnInit, OnDestroy {

	public static scrollUpButton: HTMLElement;
	public static windowScrollHeight: number = 2;

	private _destroySubject$: Subject<boolean> = new Subject();

	private _donationListBeforeRegistration: Donation[];

	private _selectedTreeProduct: Tree;

	public treeCategory: string;

	public treeCategoryTrees: Tree[];

	public treeMode: boolean;

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _store$: Store,
		private _router: Router,
		private _facadeTreeListService: FacadeServiceTreeList
	) { }

	public static isScrolling(): void {
		if (window.scrollY > TreeCategoryComponent.windowScrollHeight) {
			TreeCategoryComponent.scrollUpButton.classList.add('-app-scroll-up-button_tree-category-visible');
		} else {
			TreeCategoryComponent.scrollUpButton.classList.remove('-app-scroll-up-button_tree-category-visible');
		}
	}

	public ngOnInit(): void {
		TreeCategoryComponent.scrollUpButton = document.querySelector('.-app-scroll-up-button_tree-category');

		window.addEventListener('scroll', TreeCategoryComponent.isScrolling);

		this._activatedRoute.params
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((params: Params) => {
				this.treeCategory = params.categoryName;
				if (Boolean(this.treeCategory)) {
					this._facadeTreeListService.searchTreeCategoryTrees(this.treeCategory);
				}
			});
		this._store$.select(selectTreeCategoryTrees)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((treeCategoryTrees: Tree[]) => {
				this.treeCategoryTrees = treeCategoryTrees;
			});
		this._store$.select(selectIsTreeRouterModeAction)
			.pipe(
				delay(0),
				takeUntil(this._destroySubject$)
			).subscribe((isTreeRouterMode: boolean) => {
				this.treeMode = isTreeRouterMode;
			});
		this._store$.select(selectDonationListBeforeRegistration)
			.pipe(
				delay(0),
				takeUntil(this._destroySubject$)
			).subscribe((donationListBeforeRegistration: Donation[]) => {
				this._donationListBeforeRegistration = donationListBeforeRegistration;
			});
		this._store$.select(selectSelectedTreeProduct)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((selectedTreeProduct: Tree) => {
				if (Boolean(selectedTreeProduct)) {
					this._selectedTreeProduct = selectedTreeProduct;
				}
			});
	}

	public ngOnDestroy(): void {
		this._destroySubject$.next(true);
		this._destroySubject$.complete();
		this._facadeTreeListService.goFromTreeRouter();
		window.removeEventListener('scroll', TreeCategoryComponent.isScrolling);
	}

	public goToTreeCategoryRouter(): void {
		this._facadeTreeListService.goFromTreeRouter();
		this._router.navigate(['/trees', 'tree-category', this.treeCategory]);
	}

	public scrollTop(): void {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}

	public canDeactivate(): boolean {
		const deactivateQuestion: string = 'You haven’t chosen any tree. Are you sure that you want to go from this page? For donation you need at least one tree';
		return (!Boolean(this._donationListBeforeRegistration))
			? confirm(deactivateQuestion)
			: true;
	}

	public selectTreeProduct(tree: Tree): void {
		this._facadeTreeListService.selectTreeProduct(tree);
	}

	public isTreeProductSelected(tree: Tree): boolean {
		return Boolean(this._selectedTreeProduct)
			&& this._selectedTreeProduct.equals(tree);
	}

}
