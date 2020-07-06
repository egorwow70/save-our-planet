export class Capital {
	private _latitude: number;
	private _longitude: number;
	private _name: string;

	constructor(
		latitude: number,
		longitude: number,
		name: string
	) {
		this._latitude = latitude;
		this._longitude = longitude;
		this._name = name;
	}

	public static fromJSON(json: any): Capital {
		return Boolean(json)
			? new Capital(
				json.latitude,
				json.longitude,
				json.name,
			)
			: null;
	}

	public static toJSON(capital: Capital): any {
		return Boolean(capital)
			? {
				latitude: capital.latitude,
				longitude: capital.longitude,
				name: capital.name
			}
			: {};
	}

	public set latitude(newlatitude: number) {
		this._latitude = newlatitude;
	}

	public get latitude(): number {
		return this._latitude;
	}

	public set longitude(newlongitude: number) {
		this._longitude = newlongitude;
	}

	public get longitude(): number {
		return this._longitude;
	}

	public set name(newName: string) {
		this._name = newName;
	}

	public get name(): string {
		return this._name;
	}

	public clone(): Capital {
		return new Capital(
			this.latitude,
			this.longitude,
			this.name,
		);
	}

}
