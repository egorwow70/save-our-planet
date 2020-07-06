import { Injectable } from '@angular/core';
import { Donation } from '../models/donation-list/donation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class DonationListDataService {

	private _baseUrl: string = 'assets';

	constructor(
		private _httpClient: HttpClient
	) { }

	public loadDonationList(): Observable<Donation[]> {
		return this._httpClient.get<any>(`${this._baseUrl}/donations-data.json`)
			.pipe(
				map((json: any) => {
					return (json || []).filter(Boolean).map(Donation.fromJSON);
				})
			);
	}
}
