import { Capital } from './capital';

export class CapitalListSnapshot {

	constructor(
		public capitalList: Capital[]
	) { }

	public static fromJSON(json: any): CapitalListSnapshot {
		return Boolean(json)
			? new CapitalListSnapshot(
				(json.capitalList || []).filter(Boolean).map(Capital.fromJSON)
			)
			: null;
	}

	public static toJSON(capitalListSnapshot: CapitalListSnapshot): any {
		return Boolean(capitalListSnapshot)
			? {
				capitalList: (capitalListSnapshot.capitalList || []).filter(Boolean).map(Capital.toJSON)
			}
			: {};
	}
}
