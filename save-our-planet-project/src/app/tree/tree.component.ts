import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Tree } from '../models/tree-list/tree';
import { takeUntil, delay } from 'rxjs/operators';
import { selectSearchTree, selectIsTreeSearchLoading } from '../store/tree-list/tree-list.selectors';
import { FacadeServiceDonationList } from '../store/donation-list/donation-list.facade';
import { Donation } from '../models/donation-list/donation';
import { TreeDonation } from '../models/tree-list/tree-donation';
import { FacadeServiceTreeList } from '../store/tree-list/tree-list.facade';

@Component({
	selector: 'app-tree',
	templateUrl: './tree.component.html',
	styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit, OnDestroy {

	private _destroySubject$: Subject<boolean> = new Subject();

	private _appNavigationDonationButton: HTMLElement;

	private _isChosenAtLeastOneTree: boolean;

	public tree: Tree;
	public isSearchLoading: boolean = true;

	public descriptionMode: boolean = true;

	public treeBuyNumber: number = 1;
	public totalCost: number;
	public canMinusTreeNumber: boolean;

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _store$: Store,
		private _facadeDonationListService: FacadeServiceDonationList,
		private _facadeTreeListService: FacadeServiceTreeList
	) { }

	private calculateTotalBuyCost(): number {
		return this.tree.cost * this.treeBuyNumber;
	}

	private isCanMinusTreeNumber(): boolean {
		return (this.treeBuyNumber > 1) ? true : false;
	}

	public ngOnInit(): void {
		this._activatedRoute.params
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((params: Params) => {
				this._appNavigationDonationButton = document.querySelector('.-app-navigation__donation-button');
				this._appNavigationDonationButton.classList.remove('-app-navigation__donation-button_blinking');

				this.treeBuyNumber = 1;
				this._facadeTreeListService.searchTree(params.treeName);
				this._facadeTreeListService.goToTreeRouterMode();
			});

		const searTreeDelay: number = 3000;
		this._store$.select(selectSearchTree)
			.pipe(
				takeUntil(this._destroySubject$),
				delay(searTreeDelay)
			).subscribe((tree: Tree) => {
				if (Boolean(tree)) {
					this.tree = tree;
					this.totalCost = this.tree.cost;
					this._facadeTreeListService.searchTreeSuccess();
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

	public toggleMenuMode(): void {
		this.descriptionMode = !this.descriptionMode;
	}

	public minusTreeBuyNumber(): void {
		this.treeBuyNumber--;
		this.totalCost = this.calculateTotalBuyCost();
		this.canMinusTreeNumber = this.isCanMinusTreeNumber();
	}

	public plusTreeBuyNumber(): void {
		this.treeBuyNumber++;
		this.totalCost = this.calculateTotalBuyCost();
		this.canMinusTreeNumber = true;
	}

	public removeTreeBuyNumber(): void {
		this.treeBuyNumber = 1;
		this.totalCost = this.calculateTotalBuyCost();
		this.canMinusTreeNumber = false;
	}

	public choose(): void {
		this._appNavigationDonationButton.classList.add('-app-navigation__donation-button_blinking');

		this._isChosenAtLeastOneTree = true;
		const donation: Donation = new Donation(
			'D',
			null,
			new TreeDonation(
				'TD',
				this.treeBuyNumber,
				this.totalCost,
				this.tree
			),
			new Date()
		);
		this._facadeDonationListService.initNewUserDonationBeforeRegistration(donation);
	}

	public canDeactivate(): boolean {
		const deactivateQuestion: string = 'You haven’t chosen any tree. Are you sure that you want to go from this page? For donation you need at least one tree';
		return (!this._isChosenAtLeastOneTree)
			? confirm(deactivateQuestion)
			: true;
	}

}
