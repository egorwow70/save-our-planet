import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tree } from '../models/tree-list/tree';
import { map, first } from 'rxjs/operators';

@Injectable()
export class TreeListDataService {

	private _baseUrl: string = 'assets';

	constructor(
		private _httpClient: HttpClient
	) { }

	public loadTreeList(): Observable<Tree[]> {
		return this._httpClient.get<any>(`${this._baseUrl}/trees-data.json`)
			.pipe(
				first(),
				map((json: any) => {
					return (json || []).filter(Boolean).map(Tree.fromJSON);
				})
			);
	}
}
