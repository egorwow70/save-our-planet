import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-contacts',
	templateUrl: './contacts.component.html',
	styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {

	private _userMessage: string;

	public myFormContact: FormGroup;

	constructor(

	) {
		this.initContactForm();
	}

	public static validMatch(content: string): boolean {
		const onlyLatinCharactersNumbersAndUnderscoreMatch: RegExp = new RegExp('^[a-zA-Z_0-9]*$');
		return (onlyLatinCharactersNumbersAndUnderscoreMatch.test(content))
			? true
			: false;
	}

	public static isUserNameIncludesUnderscore(userName: string): boolean {
		return Boolean(userName.includes('_'))
			? true
			: false;
	}

	public static isValidUserNameNumberOfCharacters(
		userName: string,
		minNumbers: number,
		maxNumbers: number
	): boolean {
		return (
			userName.length >= minNumbers
			&& userName.length <= maxNumbers
		)
			? true
			: false;
	}

	public static isUserNameIncludeNumbers(userName: string): boolean {
		return (Boolean(userName.search(/\d/) >= 0))
			? true
			: false;
	}

	public static isUserNameValidMatch(userName: string): boolean {
		return ContactsComponent.validMatch(userName);
	}

	public static isValidUserName(
		userName: string,
		minNumbers: number,
		maxNumbers: number
	): boolean {
		if (Boolean(userName)) {
			const isContentIncludeNumbers: boolean = ContactsComponent.isUserNameIncludeNumbers(userName);
			const isContentValidMatch: boolean = ContactsComponent.isUserNameValidMatch(userName);
			const isValidNumberOfContentCharacters: boolean = ContactsComponent.isValidUserNameNumberOfCharacters(
				userName,
				minNumbers,
				maxNumbers
			);
			const isContentIncludeUnderscore: boolean = ContactsComponent.isUserNameIncludesUnderscore(userName);
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

	private initContactForm(): void {
		this.myFormContact = new FormGroup({
			userName: new FormControl('', [
				Validators.required,
				this.userNameValidator
			]),
			userEmail: new FormControl('', [
				Validators.required,
				Validators.pattern('^[^\s@]+@[^\s@]+\.[^\s@]+$')
			]),
			userMessage: new FormControl('', [
				Validators.required
			])
		});
	}

	private userNameValidator(control: FormControl): { [s: string]: boolean } {
		const currentUserName: string = control.value;

		const minNumberOfCharacters: number = 3;
		const maxNumberOfCharacters: number = 12;

		const isValidUserName: boolean = ContactsComponent.isValidUserName(
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

	public contact(): void {
		this._userMessage = this.myFormContact.controls.userMessage.value;
	}

}
