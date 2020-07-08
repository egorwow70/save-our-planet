import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Tree } from 'src/app/models/tree-list/tree';
import { takeUntil, delay } from 'rxjs/operators';
import { selectSearchTree, selectIsTreeSearchLoading, selectIsSelectedTree } from 'src/app/store/tree-list/tree-list.selectors';
import { FacadeServiceDonationList } from 'src/app/store/donation-list/donation-list.facade';
import { Donation } from 'src/app/models/donation-list/donation';
import { TreeDonation } from 'src/app/models/tree-list/tree-donation';
import { FacadeServiceTreeList } from 'src/app/store/tree-list/tree-list.facade';
import { selectDonationListBeforeRegistration } from 'src/app/store/donation-list/donation-list.selectors';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-tree',
	templateUrl: './tree.component.html',
	styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit, OnDestroy {

	private _destroySubject$: Subject<boolean> = new Subject();

	private _appNavigationDonationButton: HTMLElement;

	private _donationListBeforeRegistration: Donation[] = null;

	public tree: Tree;
	public isSearchLoading: boolean = true;

	public descriptionMode: boolean = true;

	public treeBuyNumber: number = 1;
	public totalCost: number;
	public canMinusTreeNumber: boolean;

	public isSelectedTree: boolean;

	public myFormTreeNumber: FormGroup;

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _store$: Store,
		private _facadeDonationListService: FacadeServiceDonationList,
		private _facadeTreeListService: FacadeServiceTreeList,
		private _router: Router
	) {
		this.initTreeNumberForm();
	}

	private initTreeNumberForm(): void {
		this.myFormTreeNumber = new FormGroup({
			treeDonationNumber: new FormControl('1', [
				Validators.required,
				this.donationTreeNumberValidator
			])
		});
	}

	private donationTreeNumberValidator(control: FormControl): { [s: string]: boolean } {
		const currentDonationTreeNumber: number = Number(control.value);

		const maxTreeBuyNumber: number = 50;
		if (
			!isNaN(currentDonationTreeNumber)
			&& currentDonationTreeNumber > 0
			&& currentDonationTreeNumber <= maxTreeBuyNumber) {
			return null;
		} else {
			return { userNameInputControlName: true };
		}
	}

	private isCanMinusTreeNumber(): boolean {
		const currentTreeBuyNumber: number = Number(this.myFormTreeNumber.controls.treeDonationNumber.value);
		return (currentTreeBuyNumber > 1) ? true : false;
	}

	public ngOnInit(): void {
		this._appNavigationDonationButton = document.querySelector('.-app-navigation__donation-button');

		this._activatedRoute.params
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((params: Params) => {
				this._appNavigationDonationButton.classList.remove('-app-navigation__donation-button_blinking');

				this.descriptionMode = true;
				this.removeTreeBuyNumber();
				this.isSelectedTree = false;
				this._facadeTreeListService.isSelectedTreeForDonation(params.treeName, this._donationListBeforeRegistration);
				this._facadeTreeListService.searchTree(params.treeName);
				this._facadeTreeListService.goToTreeRouterMode();
			});

		this._store$.select(selectDonationListBeforeRegistration)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((donationListBeforeRegistration: Donation[]) => {
				if (Boolean(donationListBeforeRegistration)) {
					this._donationListBeforeRegistration = donationListBeforeRegistration;
				}
			});

		this._store$.select(selectIsSelectedTree)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((isSelectedTree: boolean) => {
				this.isSelectedTree = isSelectedTree;
			});
		const searTreeDelay: number = 3000;
		this._store$.select(selectSearchTree)
			.pipe(
				takeUntil(this._destroySubject$),
				delay(searTreeDelay)
			).subscribe((tree: Tree) => {
				if (Boolean(tree)) {
					this.tree = tree;
					this._facadeTreeListService.selectTreeProduct(this.tree);
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

		this.myFormTreeNumber.controls.treeDonationNumber.valueChanges
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((treeNumber: string) => {
				if (this.myFormTreeNumber.controls.treeDonationNumber.valid) {
					this.treeBuyNumber = Number(treeNumber);
					this.totalCost = Number(this.treeBuyNumber) * this.tree.cost;
				}
			});
	}

	public ngOnDestroy(): void {
		this._destroySubject$.next(true);
		this._destroySubject$.complete();
		this._appNavigationDonationButton.classList.remove('-app-navigation__donation-button_blinking');
	}

	public toggleMenuMode(): void {
		this.descriptionMode = !this.descriptionMode;
	}

	public minusTreeBuyNumber(): void {
		const currentTreeBuyNumber: number = Number(this.myFormTreeNumber.controls.treeDonationNumber.value);
		const currentFormTreeBuyNumberAfterMinus: string = String(currentTreeBuyNumber - 1);
		this.myFormTreeNumber.patchValue({ treeDonationNumber: currentFormTreeBuyNumberAfterMinus });
		this.canMinusTreeNumber = this.isCanMinusTreeNumber();
	}

	public plusTreeBuyNumber(): void {
		const currentTreeBuyNumber: number = Number(this.myFormTreeNumber.controls.treeDonationNumber.value);
		const currentFormTreeBuyNumberAfterPlus: string = String(currentTreeBuyNumber + 1);
		this.myFormTreeNumber.patchValue({ treeDonationNumber: currentFormTreeBuyNumberAfterPlus });
		this.canMinusTreeNumber = true;
	}

	public removeTreeBuyNumber(): void {
		this.myFormTreeNumber.patchValue({ treeDonationNumber: '1' });
		this.canMinusTreeNumber = false;
	}

	public choose(): void {
		this._appNavigationDonationButton.classList.add('-app-navigation__donation-button_blinking');

		const chosenTreeNumber: number = Number(this.myFormTreeNumber.controls.treeDonationNumber.value);
		const donation: Donation = new Donation(
			'D',
			null,
			new TreeDonation(
				'TD',
				chosenTreeNumber,
				this.totalCost,
				this.tree
			),
			new Date()
		);
		this.isSelectedTree = true;
		this._facadeDonationListService.initNewUserDonationBeforeRegistration(donation);
	}

	public applyDonation(): void {
		this._router.navigate(['/donation']);
	}
}
