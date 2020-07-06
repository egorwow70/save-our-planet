import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../store/user-list/user-list.selectors';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from '../models/user-list/user';
import { Router } from '@angular/router';
import { FacadeServiceUserList } from '../store/user-list/user-list.facade';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Donation } from '../models/donation-list/donation';
import { selectUserDonationList, selectIsInitedUserDonationList } from '../store/donation-list/donation-list.selectors';
import { FacadeServiceDonationList } from '../store/donation-list/donation-list.facade';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

	public static currentUserMedicalPoints: number;

	private _destroySubject$: Subject<boolean> = new Subject();

	private _isGettedMedicalInsurance: boolean;

	public user: User;

	public userDonationList: Donation[];
	public isInitedUserDonationList: boolean;

	public myFormNewImage: FormGroup;
	public imageMode: boolean;

	public myFormApplyInsurance: FormGroup;
	public medicalFormMode: boolean;

	constructor(
		private _store$: Store,
		private _router: Router,
		private _facadeUserListService: FacadeServiceUserList,
		private _facadeDonationListService: FacadeServiceDonationList
	) {
		this.initImageForm();
		this.initApplyInsuranceForm();
	}

	private initImageForm(): void {
		this.myFormNewImage = new FormGroup({
			userNewImage: new FormControl('', Validators.required)
		});
	}

	private initApplyInsuranceForm(): void {
		this.myFormApplyInsurance = new FormGroup({
			userMedicalPoints: new FormControl('', [Validators.required, this.medicalPointsValidator]),
			userMessage: new FormControl('', Validators.required)
		});
	}

	private medicalPointsValidator(control: FormControl): { [s: string]: boolean } {
		const medicalPointsInputControlName: string = 'userMedicalPoints';
		if (!isNaN(control.value) && control.value > 0 && Number(control.value) <= UserProfileComponent.currentUserMedicalPoints) {
			return null;
		} else {
			return { medicalPointsInputControlName: true };
		}

	}

	private isAnyValuesEnteredInMedicalInsuranceForm(): boolean {
		if (
			Boolean(this.myFormApplyInsurance.controls.userMedicalPoints.value)
			|| Boolean(this.myFormApplyInsurance.controls.userMessage.value)
		) {
			return true;
		} else {
			return false;
		}
	}

	public ngOnInit(): void {
		this._store$.select(selectUser)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((user: User) => {
				if (Boolean(user)) {
					UserProfileComponent.currentUserMedicalPoints = user.clone().medicalPoints;
					this.user = user;
					this._facadeDonationListService.initUserDonationList(this.user.id);
				}
			});
		this._store$.select(selectUserDonationList)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((userDonationList: Donation[]) => {
				this.userDonationList = userDonationList;
				this._facadeDonationListService.initUserDonationListSuccess();
			});
		this._store$.select(selectIsInitedUserDonationList)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((isInitedUserDonationList: boolean) => {
				this.isInitedUserDonationList = isInitedUserDonationList;
			});
	}

	public ngOnDestroy(): void {
		this._destroySubject$.next(true);
		this._destroySubject$.complete();
	}

	public toggleImageMode(): void {
		this.imageMode = !this.imageMode;
	}

	public changeImage(): void {
		const newImage: string = this.myFormNewImage.controls.userNewImage.value;
		this._facadeUserListService.changeCurrentUserImage(newImage);
		this.toggleImageMode();
	}

	public startDonation(): void {
		this._router.navigate(['/donation']);
	}

	public toggleFillMedicalForm(): void {
		this.medicalFormMode = !this.medicalFormMode;
	}

	public applyInsurance(): void {
		this._isGettedMedicalInsurance = true;

		if (this.myFormApplyInsurance.invalid) {
			this.myFormApplyInsurance.controls.userMedicalPoints.markAsTouched();
			this.myFormApplyInsurance.controls.userMessage.markAsTouched();
			return;
		}
		const numberOfGetMedicalPoints: number = Number(this.myFormApplyInsurance.controls.userMedicalPoints.value);
		this._facadeUserListService.pickUpPointsFromUser(this.user.id, numberOfGetMedicalPoints);
		if (this.medicalFormMode) {
			this.toggleFillMedicalForm();
		}
		this.initApplyInsuranceForm();
	}

	public canDeactivate(): boolean {
		const deactivateQuestion: string = 'You filled in the form fields but did not get insurance. Are you sure that you want to go from this page?';
		return (!this._isGettedMedicalInsurance && this.isAnyValuesEnteredInMedicalInsuranceForm())
			? confirm(deactivateQuestion)
			: true;
	}

}
