import { Country } from '../country-list/country';
import { Donation } from '../donation-list/donation';

export class User {
	private _id: string;
	private _name: string;
	private _surName: string;
	private _password: string;
	private _email: string;
	private _profileImage: string;
	private _age: number;
	private _date: Date;
	private _country: Country;
	private _donationList: Donation[];
	private _medicalPoints: number;

	constructor(
		id: string,
		name: string,
		surName: string,
		password: string,
		email?: string,
		profileImage?: string,
		age?: number,
		date?: Date,
		country?: Country,
		donationList?: Donation[],
		medicalPoints?: number
	) {
		this._id = id;
		this._name = name;
		this._surName = surName;
		this._password = password;
		this._email = email;
		this._profileImage = profileImage;
		this._age = age;
		this._date = date;
		this._country = country;
		this._donationList = donationList;
		this._medicalPoints = medicalPoints;
	}

	public set id(newId: string) {
		this._id = newId;
	}

	public get id(): string {
		return this._id;
	}

	public set name(newName: string) {
		this._name = newName;
	}

	public get name(): string {
		return this._name;
	}

	public set surName(newSurname: string) {
		this._surName = newSurname;
	}

	public get surName(): string {
		return this._surName;
	}

	public set password(newPassword: string) {
		this._password = newPassword;
	}

	public get password(): string {
		return this._password;
	}

	public set email(newEmail: string) {
		this._email = newEmail;
	}

	public get email(): string {
		return this._email;
	}

	public set profileImage(newProfileImage: string) {
		this._profileImage = newProfileImage;
	}

	public get profileImage(): string {
		return this._profileImage;
	}

	public set age(newAge: number) {
		this._age = newAge;
	}

	public get age(): number {
		return this._age;
	}

	public set date(newDate: Date) {
		this._date = newDate;
	}

	public get date(): Date {
		return this._date;
	}

	public set country(newCountry: Country) {
		this._country = newCountry;
	}

	public get country(): Country {
		return this._country;
	}

	public set donationList(newDonationList: Donation[]) {
		this._donationList = newDonationList;
	}

	public get donationList(): Donation[] {
		return this._donationList;
	}

	public set medicalPoints(newMedicalPoints: number) {
		this._medicalPoints = newMedicalPoints;
	}

	public get medicalPoints(): number {
		return this._medicalPoints;
	}

	public static fromJSON(json: any): User {
		return Boolean(json)
			? new User(
				json.id,
				json.name,
				json.surname,
				json.password,
				json.email,
				json.profileImage,
				Number(json.age),
				json.date,
				Country.fromJSON(json.country),
				json.donationList,
				Number(json.medicalPoints)
			)
			: null;
	}

	public clone(): User {
		const donationListClone: Donation[] = (Boolean(this.donationList))
			? [...this.donationList]
			: null;
		const countryListClone: Country = (Boolean(this.country))
			? this.country.clone()
			: null;
		return new User(
			this.id,
			this.name,
			this.surName,
			this.password,
			this.email,
			this.profileImage,
			this.age,
			this.date,
			countryListClone,
			donationListClone,
			this.medicalPoints
		);
	}

	public loginEquals(user: User): boolean {
		return this.name === user.name
			&& this.surName === user.surName
			&& this.password === user.password
			&& Boolean(user);
	}

}
