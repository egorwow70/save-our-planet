import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user-list/user';
import { first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class UserListDataService {

	private _baseUrl: string = 'assets';

	constructor(
		private _httpClient: HttpClient
	) { }

	public loadUserList(): Observable<User[]> {
		return this._httpClient.get<any>(`${this._baseUrl}/users-data.json`)
			.pipe(
				first(),
				map((json: any) => {
					return (json || []).filter(Boolean).map(User.fromJSON);
				})
			);
	}

}
