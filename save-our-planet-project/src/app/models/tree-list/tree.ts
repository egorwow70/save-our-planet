import { TreeType } from './tree-type';

export class Tree {
	private _id: string;
	private _name: string;
	private _description: string;
	private _picture: string;
	private _size: string;
	private _environment: string;
	private _keyFeature: string;
	private _cost: number;
	private _type: TreeType;

	constructor(
		id: string,
		name: string,
		description: string,
		picture: string,
		size: string,
		environment: string,
		keyFeature: string,
		cost: number,
		type: TreeType,
	) {
		this._id = id;
		this._name = name;
		this._description = description;
		this._picture = picture;
		this._size = size;
		this._environment = environment;
		this._keyFeature = keyFeature;
		this._cost = cost;
		this._type = type;
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

	public set description(newDescription: string) {
		this._description = newDescription;
	}

	public get description(): string {
		return this._description;
	}

	public set picture(newPicture: string) {
		this._picture = newPicture;
	}

	public get picture(): string {
		return this._picture;
	}

	public set size(newSize: string) {
		this._size = newSize;
	}

	public get size(): string {
		return this._size;
	}

	public set environment(newEnvironment: string) {
		this._environment = newEnvironment;
	}

	public get environment(): string {
		return this._environment;
	}

	public set keyFeature(newKeyFeature: string) {
		this._keyFeature = newKeyFeature;
	}

	public get keyFeature(): string {
		return this._keyFeature;
	}

	public set cost(newCost: number) {
		this._cost = newCost;
	}

	public get cost(): number {
		return this._cost;
	}

	public set type(newType: TreeType) {
		this._type = newType;
	}

	public get type(): TreeType {
		return this._type;
	}

	public static fromJSON(json: any): Tree {
		return Boolean(json)
			? new Tree(
				json.id,
				json.name,
				json.description,
				json.picture,
				json.size,
				json.environment,
				json.keyFeature,
				Number(json.cost),
				TreeType[json.id],
			)
			: null;
	}

	public clone(): Tree {
		return new Tree(
			this.id,
			this.name,
			this.description,
			this.picture,
			this.size,
			this.environment,
			this.keyFeature,
			this.cost,
			this.type,
		);
	}

}
