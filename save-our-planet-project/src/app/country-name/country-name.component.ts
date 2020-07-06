import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Country } from '../models/country-list/country';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-country-name',
	templateUrl: './country-name.component.html',
	styleUrls: ['./country-name.component.scss']
})
export class CountryNameComponent implements OnInit, OnDestroy {

	private _destroySubject$: Subject<boolean> = new Subject();

	private _regionName: string;
	private _subRegionName: string;

	@Input()
	public country: Country;

	constructor(
		private _router: Router,
		private _activatedRoute: ActivatedRoute,
	) { }

	public ngOnInit(): void {
		this._activatedRoute.params
			.pipe(
				takeUntil(this._destroySubject$),
			).subscribe((params: Params) => {
				this._regionName = params.regionName;
				this._subRegionName = params.subRegionName;
			});
	}

	public ngOnDestroy(): void {
		this._destroySubject$.next(true);
		this._destroySubject$.complete();
	}

	public goToCurrentCountryRouter(): void {
		const countryName: string = this.country.name.replace(/\./g, '')
			.replace(/\(|\)/g, '')
			.toLowerCase()
			.split(' ')
			.join('-');
		this._router.navigate(['/countries', 'region', this._regionName, this._subRegionName, 'country', countryName]);
	}

}
