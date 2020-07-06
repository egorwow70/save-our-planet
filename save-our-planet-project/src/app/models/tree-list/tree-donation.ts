import { Tree } from './tree';

export class TreeDonation {
	private _id: string;
	private _amont: number;
	private _cost: number;
	private _tree: Tree;

	constructor(
		id: string,
		amount: number,
		cost: number,
		tree: Tree
	) {
		this._id = id;
		this._amont = amount;
		this._cost = cost;
		this._tree = tree;
	}

	public set id(newId: string) {
		this._id = newId;
	}

	public get id(): string {
		return this._id;
	}

	public set amount(newAmount: number) {
		this._amont = newAmount;
	}

	public get amount(): number {
		return this._amont;
	}

	public set cost(newCost: number) {
		this._cost = newCost;
	}

	public get cost(): number {
		return this._cost;
	}

	public set tree(newTree: Tree) {
		this._tree = newTree;
	}

	public get tree(): Tree {
		return this._tree;
	}

	public clone(): TreeDonation {
		return new TreeDonation(
			this.id,
			this.amount,
			this.cost,
			this.tree.clone()
		);
	}

}
