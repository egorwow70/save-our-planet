import { Capital } from './capital';

export class Country {
	private _id: string;
	private _name: string;
	private _nativeName: string;
	private _region: string;
	private _subRegion: string;
	private _capital: Capital;
	private _population: number;
	private _area: number;
	private _forestArea: number;
	private _flag: string;
	private _timeZone: string;

	constructor(
		id: string,
		name: string,
		nativeName: string,
		region: string,
		subRegion: string,
		capital: Capital,
		population: number,
		area: number,
		forestArea: number,
		flag: string,
		timeZone: string
	) {
		this._id = id;
		this._name = name;
		this._nativeName = nativeName;
		this._region = region;
		this._subRegion = subRegion;
		this._capital = capital;
		this._population = population;
		this._area = area;
		this._forestArea = forestArea;
		this._flag = flag;
		this._timeZone = timeZone;
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

	public set nativeName(newNativeName: string) {
		this._nativeName = newNativeName;
	}

	public get nativeName(): string {
		return this._nativeName;
	}

	public set region(newRegion: string) {
		this._region = newRegion;
	}

	public get region(): string {
		return this._region;
	}

	public set subRegion(newSubRegion: string) {
		this._subRegion = newSubRegion;
	}

	public get subRegion(): string {
		return this._subRegion;
	}

	public set capital(newCapital: Capital) {
		this._capital = newCapital;
	}

	public get capital(): Capital {
		return this._capital;
	}

	public set population(newPopulation: number) {
		this._population = newPopulation;
	}

	public get population(): number {
		return this._population;
	}

	public set area(newArea: number) {
		this._area = newArea;
	}

	public get area(): number {
		return this._area;
	}

	public set forestArea(newForestArea: number) {
		this._forestArea = newForestArea;
	}

	public get forestArea(): number {
		return this._forestArea;
	}

	public set flag(newFlag: string) {
		this._flag = newFlag;
	}

	public get flag(): string {
		return this._flag;
	}

	public set timeZone(newTimeZone: string) {
		this._timeZone = newTimeZone;
	}

	public get timeZone(): string {
		return this._timeZone;
	}

	public static fromJSON(json: any): Country {
		const timezones: string = (Boolean(json.timezones) ?? json.timezones.length > 0)
			? json.timezones[0]
			: undefined;
		return Boolean(json)
			? new Country(
				json.alpha2Code,
				json.name,
				json.nativeName,
				json.region,
				json.subregion,
				new Capital(
					json.latitude,
					json.longitude,
					json.capital
				),
				json.population,
				json.area,
				json.forestArea,
				json.flag,
				timezones,
			)
			: null;
	}

	public clone(): Country {
		return new Country(
			this.id,
			this.name,
			this.nativeName,
			this.region,
			this.subRegion,
			this.capital.clone(),
			this.population,
			this.area,
			this.forestArea,
			this.flag,
			this.timeZone
		);
	}

	public equals(country: Country): boolean {
		return (Boolean(country)
			&& JSON.stringify(country) === JSON.stringify(this));
	}
}
