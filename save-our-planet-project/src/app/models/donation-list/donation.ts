import { Country } from '../country-list/country';
import { TreeDonation } from '../tree-list/tree-donation';
import { Tree } from '../tree-list/tree';
import { TreeType } from '../tree-list/tree-type';

export class Donation {
	private _id: string;
	private _country: Country;
	private _treeDonation: TreeDonation;
	private _date: Date;

	constructor(
		id: string,
		country: Country,
		treeDonation: TreeDonation,
		date: Date,
	) {
		this._id = id;
		this._country = country;
		this._treeDonation = treeDonation;
		this._date = date;
	}

	public static fromJSON(json: any): Donation {
		return Boolean(json)
			? new Donation(
				json.id,
				json.country,
				new TreeDonation(
					json.treeDonation.id,
					json.treeDonation.amount,
					json.treeDonation.cost,
					new Tree(
						json.treeDonation.tree.id,
						json.treeDonation.tree.name,
						json.treeDonation.tree.description,
						json.treeDonation.tree.picture,
						json.treeDonation.tree.size,
						json.treeDonation.tree.environment,
						json.treeDonation.tree.keyFeature,
						Number(json.treeDonation.tree.cost),
						TreeType[json.treeDonation.tree.id]
					)
				),
				json.date,
			)
			: null;
	}

	public set id(newId: string) {
		this._id = newId;
	}

	public get id(): string {
		return this._id;
	}

	public set country(newCountry: Country) {
		this._country = newCountry;
	}

	public get country(): Country {
		return this._country;
	}

	public set treeDonation(newTreeDonation: TreeDonation) {
		this._treeDonation = newTreeDonation;
	}

	public get treeDonation(): TreeDonation {
		return this._treeDonation;
	}

	public set date(newDate: Date) {
		this._date = newDate;
	}

	public get date(): Date {
		return this._date;
	}

	public equals(donation: Donation): boolean {
		return (Boolean(donation)
			&& JSON.stringify(donation) === JSON.stringify(this));
	}

	public clone(): Donation {
		return new Donation(
			this.id,
			this.country,
			this.treeDonation.clone(),
			this.date
		);
	}
}
