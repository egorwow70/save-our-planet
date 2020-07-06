import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { Country } from '../models/country-list/country';
import { selectSubRegionsCountries } from '../store/country-list/country-list.selectors';
import { FacadeServiceCountryList } from '../store/country-list/country-list.facade';

@Component({
	selector: 'app-region',
	templateUrl: './region.component.html',
	styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit, OnDestroy {

	private _destroySubject$: Subject<boolean> = new Subject();

	private _windowScrollHeight: Number = 2;
	private _scrollBlock: HTMLElement;

	public regionName: string;
	public subRegionName: string;

	public subRegionsCountries: Country[];

	constructor(
		private _store$: Store,
		private _router: Router,
		private _activatedRoute: ActivatedRoute,
		private _facadeCountryListService: FacadeServiceCountryList,
	) { }

	private navigateToCurrentSubRegionRoute(): void {
		const firstSubRegionCountryName: string = this.subRegionsCountries[0].name;
		const firstSubRegionCountryRouterName: string = firstSubRegionCountryName.replace(/\./g, '')
			.replace(/\(|\)/g, '')
			.toLowerCase()
			.split(' ')
			.join('-');
		this._router.navigate(['/countries', 'region', this.regionName, this.subRegionName, 'country', firstSubRegionCountryRouterName]);
	}

	public ngOnInit(): void {
		const scrollUpButton: HTMLElement = document.querySelector('.-app-scroll-up-button_sub-region-category');
		this._scrollBlock = document.querySelector('.-app-region');

		this._scrollBlock.addEventListener('scroll', () => {
			if (this._scrollBlock.scrollTop > this._windowScrollHeight) {
				scrollUpButton.classList.add('-app-scroll-up-button_sub-region-category-visible');
			} else {
				scrollUpButton.classList.remove('-app-scroll-up-button_sub-region-category-visible');
			}
		});

		this._activatedRoute.params
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((params: Params) => {
				this.regionName = params.regionName;
				this.subRegionName = params.subRegionName;
				this._facadeCountryListService.searchSubRegionCountries(this.regionName, this.subRegionName);
			});

		this._store$.select(selectSubRegionsCountries)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((subRegionsCountries: Country[]) => {
				if (Boolean(subRegionsCountries)) {
					this.subRegionsCountries = subRegionsCountries;
					this.navigateToCurrentSubRegionRoute();
				}
			});

	}

	public ngOnDestroy(): void {
		this._destroySubject$.next(true);
		this._destroySubject$.complete();
	}

	public scrollTop(): void {
		this._scrollBlock.scrollTo(0, 0);
	}

}
