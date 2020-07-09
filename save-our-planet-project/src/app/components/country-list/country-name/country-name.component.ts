import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Country } from 'src/app/models/country-list/country';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, delay } from 'rxjs/operators';
import { selectIsCountrySearchLoading } from 'src/app/store/country-list/country-list.selectors';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-country-name',
	templateUrl: './country-name.component.html',
	styleUrls: ['./country-name.component.scss']
})
export class CountryNameComponent implements OnInit, OnDestroy {

	private _destroySubject$: Subject<boolean> = new Subject();

	private _regionName: string;
	private _subRegionName: string;

	public isSearchLoading: boolean = true;

	@Input()
	public country: Country;

	@Input()
	public isCountrySelected: boolean;

	@Output()
	public onSelected: EventEmitter<Country> = new EventEmitter<Country>();

	constructor(
		private _router: Router,
		private _activatedRoute: ActivatedRoute,
		private _store$: Store
	) { }

	public ngOnInit(): void {
		this._activatedRoute.params
			.pipe(
				takeUntil(this._destroySubject$),
			).subscribe((params: Params) => {
				this._regionName = params.regionName;
				this._subRegionName = params.subRegionName;
			});

		this._store$.select(selectIsCountrySearchLoading)
			.pipe(
				delay(0),
				takeUntil(this._destroySubject$)
			).subscribe((isSearchLoading: boolean) => {
				this.isSearchLoading = isSearchLoading;
			});
	}

	public ngOnDestroy(): void {
		this._destroySubject$.next(true);
		this._destroySubject$.complete();
	}

	public goToCurrentCountryRouter(): void {
		this.onSelected.emit(this.country);
		const countryName: string = this.country.name.replace(/\./g, '')
			.replace(/\(|\)/g, '')
			.toLowerCase()
			.split(' ')
			.join('-');
		this._router.navigate([
			'/countries',
			'region',
			this._regionName,
			this._subRegionName,
			'country',
			countryName
		]);
	}

}
