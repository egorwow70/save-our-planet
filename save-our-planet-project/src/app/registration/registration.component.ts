import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../models/user-list/user';
import { Store } from '@ngrx/store';
import { selectUserList } from '../store/user-list/user-list.selectors';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Donation } from '../models/donation-list/donation';
import { Country } from '../models/country-list/country';
import { FacadeServiceUserList } from '../store/user-list/user-list.facade';
import { RegistrationFormInterface } from '../models/user-list/registration-form-interface';
import { RegistrationType } from '../models/user-list/registration-type';

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

	public static enteredUserPassword: string;

	private _destroySubject$: Subject<boolean> = new Subject();

	private _registrationModeName: string;
	private _isUserRegistrated: boolean;

	private _userList: User[];

	public registrationMode: boolean;

	public myFormLogin: FormGroup;
	public myFormRegistrate: FormGroup;

	constructor(
		private _store$: Store,
		private _router: Router,
		private _facadeUserListService: FacadeServiceUserList,
		private _activatedRoute: ActivatedRoute
	) {
		this.initLoginForm();
		this.initRegistrateForm();
	}

	public static validMatch(content: string): boolean {
		const onlyLatinCharactersNumbersAndUnderscoreMatch: RegExp = new RegExp('^[a-zA-Z_0-9]*$');
		return (onlyLatinCharactersNumbersAndUnderscoreMatch.test(content))
			? true
			: false;
	}

	public static isUserNameOrSurnameIncludesUnderscore(userNameOrSurname: string): boolean {
		return Boolean(userNameOrSurname.includes('_'))
			? true
			: false;
	}

	public static isValidUserNameOrSurnameNumberOfCharacters(
		userNameOrSurname: string,
		minNumbers: number,
		maxNumbers: number
	): boolean {
		return (
			userNameOrSurname.length >= minNumbers
			&& userNameOrSurname.length <= maxNumbers
		)
			? true
			: false;
	}

	public static isUserNameOrSurnameIncludeNumbers(userNameOrSurname: string): boolean {
		return (Boolean(userNameOrSurname.search(/\d/) >= 0))
			? true
			: false;
	}

	public static isUserNameOrSurnameValidMatch(userNameOrSurname: string): boolean {
		return RegistrationComponent.validMatch(userNameOrSurname);
	}

	public static isValidUserNameOrSurname(
		userNameOrSurname: string,
		minNumbers: number,
		maxNumbers: number
	): boolean {
		if (Boolean(userNameOrSurname)) {
			const isContentIncludeNumbers: boolean = RegistrationComponent.isUserNameOrSurnameIncludeNumbers(userNameOrSurname);
			const isContentValidMatch: boolean = RegistrationComponent.isUserNameOrSurnameValidMatch(userNameOrSurname);
			const isValidNumberOfContentCharacters: boolean = RegistrationComponent.isValidUserNameOrSurnameNumberOfCharacters(
				userNameOrSurname,
				minNumbers,
				maxNumbers
			);
			const isContentIncludeUnderscore: boolean = RegistrationComponent.isUserNameOrSurnameIncludesUnderscore(userNameOrSurname);
			if (
				!isContentIncludeNumbers
				&& isContentValidMatch
				&& isValidNumberOfContentCharacters
				&& !isContentIncludeUnderscore
			) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	public static isValidUserAgeYearsOld(
		userAge: number,
		minAge: number,
		maxAge: number
	): boolean {
		return (
			userAge >= minAge
			&& userAge <= maxAge
		)
			? true
			: false;
	}

	public static isUserPasswordValidMatch(userPassword: string): boolean {
		return RegistrationComponent.validMatch(userPassword);
	}

	private initLoginForm(): void {
		this.myFormLogin = new FormGroup({
			userName: new FormControl('', [
				Validators.required,
				this.userNameValidator
			]),
			userSurname: new FormControl('', [
				Validators.required,
				this.userSurnameValidator
			]),
			userPassword: new FormControl('', [
				Validators.required,
				this.userPasswordValidator
			])
		});
	}

	private initRegistrateForm(): void {
		this.myFormRegistrate = new FormGroup({
			userName: new FormControl('', [
				Validators.required,
				this.userNameValidator
			]),
			userSurname: new FormControl('', [
				Validators.required,
				this.userSurnameValidator
			]),
			userEmail: new FormControl('', [
				Validators.required,
				Validators.pattern('^[^\s@]+@[^\s@]+\.[^\s@]+$')
			]),
			userAge: new FormControl('', [
				Validators.required,
				this.userAgeValidator
			]),
			userPassword: new FormControl('', [
				Validators.required,
				this.userPasswordValidator
			]),
			userRepeatPassword: new FormControl('', [
				Validators.required,
				this.userRepeatPasswordValidator
			])
		});
	}

	private userNameValidator(control: FormControl): { [s: string]: boolean } {
		const currentUserName: string = control.value;

		const minNumberOfCharacters: number = 3;
		const maxNumberOfCharacters: number = 12;

		const isValidUserName: boolean = RegistrationComponent.isValidUserNameOrSurname(
			currentUserName,
			minNumberOfCharacters,
			maxNumberOfCharacters
		);
		if (isValidUserName) {
			return null;
		} else {
			return { userNameInputControlName: true };
		}
	}

	private userSurnameValidator(control: FormControl): { [s: string]: boolean } {
		const currentUserSurname: string = control.value;

		const minNumberOfCharacters: number = 3;
		const maxNumberOfCharacters: number = 20;

		const isValidUserSurname: boolean = RegistrationComponent.isValidUserNameOrSurname(
			currentUserSurname,
			minNumberOfCharacters,
			maxNumberOfCharacters
		);
		if (isValidUserSurname) {
			return null;
		} else {
			return { userSurnameInputControlName: true };
		}
	}

	private userAgeValidator(control: FormControl): { [s: string]: boolean } {
		const currentUserAge: number = control.value;

		if (Boolean(currentUserAge) && !isNaN(currentUserAge)) {
			const minAge: number = 12;
			const maxAge: number = 150;

			const isValidUserAgeYearsOld: boolean = RegistrationComponent.isValidUserAgeYearsOld(
				currentUserAge,
				minAge,
				maxAge
			);
			if (isValidUserAgeYearsOld) {
				return null;
			} else {
				return { userAgeInputControlName: true };
			}
		} else {
			return { userAgeInputControlName: true };
		}
	}

	private userPasswordValidator(control: FormControl): { [s: string]: boolean } {
		const currentUserPassword: string = control.value;

		const minNumberOfCharacters: number = 6;
		const maxNumberOfCharacters: number = 15;

		const isUserPasswordValidMatch: boolean = RegistrationComponent.isUserPasswordValidMatch(currentUserPassword);
		if (Boolean(currentUserPassword)) {
			if (
				isUserPasswordValidMatch
				&& currentUserPassword.length >= minNumberOfCharacters
				&& currentUserPassword.length <= maxNumberOfCharacters
			) {
				RegistrationComponent.enteredUserPassword = currentUserPassword;
				return null;
			} else {
				return { userPasswordInputControlName: true };
			}
		} else {
			return { userPasswordInputControlName: true };
		}
	}

	private userRepeatPasswordValidator(control: FormControl): { [s: string]: boolean } {
		const currentUserPassword: string = RegistrationComponent.enteredUserPassword;
		const currentUserRepeatPassword: string = control.value;

		if (
			Boolean(currentUserPassword)
			&& currentUserRepeatPassword === currentUserPassword
		) {
			return null;
		} else {
			return { userRepeatPasswordInputControlName: true };
		}
	}

	private getNewUserId(newRegistrationUser: RegistrationFormInterface): string {
		const dash: string = '-';
		const firstLetterOfNameForId: string = newRegistrationUser.newUserName[0].toUpperCase();
		const firstLetterOfSurnameForId: string = newRegistrationUser.newUserSurname[0].toUpperCase();
		const defaultNewUserId: string = firstLetterOfNameForId + firstLetterOfSurnameForId + dash
			+ String(newRegistrationUser.newUserAge);
		return defaultNewUserId;
	}

	private getRegistrationFormValue(): RegistrationFormInterface {
		const userAge: number = Number(this.myFormRegistrate.controls.userAge.value);
		const userName: string = this.myFormRegistrate.controls.userName.value;
		const userSurname: string = this.myFormRegistrate.controls.userSurname.value;
		const userPassword: string = this.myFormRegistrate.controls.userPassword.value;
		const userRepeatPassword: string = this.myFormRegistrate.controls.userRepeatPassword.value;
		const userEmail: string = this.myFormRegistrate.controls.userEmail.value;
		return {
			newUserName: userName,
			newUserSurname: userSurname,
			newUserEmail: userEmail,
			newUserAge: userAge,
			newUserPassword: userPassword,
			newUserRepeatPassword: userRepeatPassword
		};
	}

	private isAnyValuesEnteredInRegistrationForm(): boolean {
		const newRegistrationUser: RegistrationFormInterface = this.getRegistrationFormValue();
		if (
			Boolean(newRegistrationUser.newUserAge)
			|| Boolean(newRegistrationUser.newUserName)
			|| Boolean(newRegistrationUser.newUserSurname)
			|| Boolean(newRegistrationUser.newUserPassword)
			|| Boolean(newRegistrationUser.newUserEmail)
		) {
			return true;
		} else {
			return false;
		}
	}

	public ngOnInit(): void {
		this._activatedRoute.params
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((params: Params) => {
				this._registrationModeName = params.registrationMode;
				if (this._registrationModeName === RegistrationType.RM) {
					this.registrationMode = true;
				}
			});

		this._store$.select(selectUserList)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((userList: User[]) => {
				this._userList = userList;
			});
	}

	public ngOnDestroy(): void {
		this._destroySubject$.next(true);
		this._destroySubject$.complete();
	}

	public switchRegistrationMode(): void {
		const registrationModeAfterSwitch: string = (this._registrationModeName === RegistrationType.LM)
			? RegistrationType.RM
			: RegistrationType.LM;
		this._router.navigate([
			'/registration',
			'mode',
			registrationModeAfterSwitch
		]);
		this.registrationMode = !this.registrationMode;
	}

	public login(): void {
		const loginUserName: string = this.myFormLogin.controls.userName.value;
		const loginUserSurname: string = this.myFormLogin.controls.userSurname.value;
		const loginUserPassword: string = this.myFormLogin.controls.userPassword.value;
		const defaultUserLoginId: string = '1';

		const userLogsIn: User = new User(
			defaultUserLoginId,
			loginUserName,
			loginUserSurname,
			loginUserPassword
		);
		const currentUser: User = this._userList.find((user: User) => {
			return userLogsIn.loginEquals(user);
		});

		if (Boolean(currentUser)) {
			this._facadeUserListService.initUser(currentUser);
			this._router.navigate(['/user-profile']);
		} else {
			this.initLoginForm();
			this.myFormLogin.controls.userName.markAsTouched();
			this.myFormLogin.controls.userSurname.markAsTouched();
			this.myFormLogin.controls.userPassword.markAsTouched();
		}
	}

	public registrate(): void {
		const newRegistrationUser: RegistrationFormInterface = this.getRegistrationFormValue();

		const newUserRegistrationDate: Date = new Date();
		const defaultNewUserDonationList: Donation[] = null;
		const deafultNewUserCountry: Country = null;
		const defaultNewUserMedicalPoints: number = 0;
		const defaultNewUserId: string = this.getNewUserId(newRegistrationUser);

		const defaultNewUser: User = new User(
			defaultNewUserId,
			newRegistrationUser.newUserName,
			newRegistrationUser.newUserSurname,
			newRegistrationUser.newUserPassword,
			newRegistrationUser.newUserEmail,
			'',
			newRegistrationUser.newUserAge,
			newUserRegistrationDate,
			deafultNewUserCountry,
			defaultNewUserDonationList,
			defaultNewUserMedicalPoints
		);

		this._isUserRegistrated = true;

		this._facadeUserListService.initNewUser(defaultNewUser);

		this.initRegistrateForm();
	}

	public canDeactivate(): boolean {
		let deactivateQuestion: string;
		deactivateQuestion = 'You filled in the form fields but did not registrate. Are you sure that you want to go from this page?';
		return (!this._isUserRegistrated && this.isAnyValuesEnteredInRegistrationForm())
			? confirm(deactivateQuestion)
			: true;
	}
}
