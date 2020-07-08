import { Component, OnInit, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Tree } from 'src/app/models/tree-list/tree';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeUntil, delay } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsTreeRouterModeAction, selectIsTreeSearchLoading } from 'src/app/store/tree-list/tree-list.selectors';

@Component({
	selector: 'app-tree-product',
	templateUrl: './tree-product.component.html',
	styleUrls: ['./tree-product.component.scss']
})
export class TreeProductComponent implements OnInit, OnDestroy {

	private _destroySubject$: Subject<boolean> = new Subject();

	private _treeCategoryName: string;

	public isSearchLoading: boolean = true;

	@Input()
	public tree: Tree;

	@Input()
	public isTreeProductSelected: boolean;

	@Output()
	public onTreeProductSelected: EventEmitter<Tree> = new EventEmitter<Tree>();

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _store$: Store
	) { }

	public ngOnInit(): void {
		this._activatedRoute.params
			.pipe(
				takeUntil(this._destroySubject$),
			).subscribe((params: Params) => {
				this._treeCategoryName = params.categoryName;
			});
		this._store$.select(selectIsTreeRouterModeAction)
			.pipe(
				delay(0),
				takeUntil(this._destroySubject$),
			).subscribe((isTreeRouterModeAction: boolean) => {
				if (!isTreeRouterModeAction) {
					this.isTreeProductSelected = false;
				}
			});
		this._store$.select(selectIsTreeSearchLoading)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((isSearchLoading: boolean) => {
				this.isSearchLoading = isSearchLoading;
			});
	}

	public ngOnDestroy(): void {
		this._destroySubject$.next(true);
		this._destroySubject$.complete();
	}

	public goToCurrentTreeRouter(): void {
		if (!this.isSearchLoading) {
			this.onTreeProductSelected.emit(this.tree);
			const currentTreeName: string = this.tree.name;
			const currentTreeRouterName: string = currentTreeName.replace(/\(|\)/g, '').toLowerCase().split(' ').join('-');
			this._router.navigate(['/trees', 'tree-category', this._treeCategoryName, 'tree', currentTreeRouterName]);
		}
	}

}
