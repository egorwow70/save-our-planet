import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeUntil, delay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectTreeCategoryTrees, selectIsTreeRouterModeAction } from '../store/tree-list/tree-list.selectors';
import { Tree } from '../models/tree-list/tree';
import { FacadeServiceTreeList } from '../store/tree-list/tree-list.facade';

@Component({
	selector: 'app-tree-category',
	templateUrl: './tree-category.component.html',
	styleUrls: ['./tree-category.component.scss']
})
export class TreeCategoryComponent implements OnInit, OnDestroy {

	private _destroySubject$: Subject<boolean> = new Subject();

	private _windowScrollHeight: number = 20;

	public treeCategory: string;

	public treeCategoryTrees: Tree[];

	public treeMode: boolean;

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _store$: Store,
		private _router: Router,
		private _facadeTreeListService: FacadeServiceTreeList
	) { }

	public ngOnInit(): void {
		const scrollUpButton: HTMLElement = document.querySelector('.-app-scroll-up-button_tree-category');

		window.addEventListener('scroll', () => {
			if (window.scrollY > this._windowScrollHeight) {
				scrollUpButton.classList.add('-app-scroll-up-button_tree-category-visible');
			} else {
				scrollUpButton.classList.remove('-app-scroll-up-button_tree-category-visible');
			}
		});

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
	}

	public ngOnDestroy(): void {
		this._destroySubject$.next(true);
		this._destroySubject$.complete();
		this._facadeTreeListService.goFromTreeRouter();
	}

	public goToTreeCategoryRouter(): void {
		this._facadeTreeListService.goFromTreeRouter();
		this._router.navigate(['/trees', 'tree-category', this.treeCategory]);
	}

	public scrollTop(): void {
		window.scrollTo(0, 0);
	}

}
