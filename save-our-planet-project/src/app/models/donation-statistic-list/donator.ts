export class Donator {
	private _name: string;
	private _points: number;
	private _bullet: string;

	constructor(
		name: string,
		points: number,
		bullet: string
	) {
		this._name = name;
		this._points = points;
		this._bullet = bullet;
	}

	public set name(newName: string) {
		this._name = newName;
	}

	public get name(): string {
		return this._name;
	}

	public set points(newPoints: number) {
		this._points = newPoints;
	}

	public get points(): number {
		return this._points;
	}

	public set bullet(newBullet: string) {
		this._bullet = newBullet;
	}

	public get bullet(): string {
		return this._bullet;
	}

	public clone(): Donator {
		return new Donator(
			this.name,
			this.points,
			this.bullet,
		);
	}

}
