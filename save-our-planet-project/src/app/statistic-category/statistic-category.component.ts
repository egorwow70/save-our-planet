import { Component, OnInit, NgZone, OnDestroy, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { Store } from '@ngrx/store';
import { FacadeServiceDonationStatisticList } from '../store/donation-statistic-list/donation-statistic-list.facade';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { takeUntil, delay } from 'rxjs/operators';
import {
	selectStatisticData,
	selectIsInitedStatisticDataByCost,
	selectIsInitedStatisticDataByTree,
	selectIsStatisticDataSortedByIncrease,
	selectIsStatisticDataSortedByDecrease,
	selectIsInitedAllDataStatistic,
	selectIsInitedTopTenDataStatistic
} from '../store/donation-statistic-list/donation-statistic-list.selectors';
import { DonationStatisticInterface } from '../models/donation-statistic-list/donation-statistic-interface';
import { selectUserList } from '../store/user-list/user-list.selectors';
import { selectDonationList } from '../store/donation-list/donation-list.selectors';
import { User } from '../models/user-list/user';
import { Donation } from '../models/donation-list/donation';
import { StatisticCategoryType } from '../models/donation-statistic-list/statistic-category-type';

@Component({
	selector: 'app-statistic-category',
	templateUrl: './statistic-category.component.html',
	styleUrls: ['./statistic-category.component.scss']
})
export class StatisticCategoryComponent implements OnInit, OnDestroy, AfterViewInit {
	private _destroySubject$: Subject<boolean> = new Subject();
	private _chart: am4charts.XYChart;

	private statisticData: DonationStatisticInterface[];

	private _statisticElement: string;
	public statisticCategory: string;
	public statisticSubCategory: string;

	public isInitedAllDataStatistic: boolean;
	public isInitedTopTenDataStatistic: boolean;
	public isInitedStatisticDataByTree: boolean;
	public isInitedStatisticDataByCost: boolean;
	public statisticDataIsSortedByIncrease: boolean;
	public statisticDataIsSortedByDecrease: boolean;

	constructor(
		private _zone: NgZone,
		private _store$: Store,
		private _facadeDonationStatisticListService: FacadeServiceDonationStatisticList,
		private _activatedRoute: ActivatedRoute,
		private _router: Router
	) { }

	private navigateStatisticCategoryRoute(): void {
		if (this.statisticCategory === StatisticCategoryType.D) {
			this._facadeDonationStatisticListService.initDonatorsData(this.statisticSubCategory, this._statisticElement);
		}
		if (this.statisticCategory === StatisticCategoryType.C) {
			this._facadeDonationStatisticListService.initCountriesData(this.statisticSubCategory, this._statisticElement);
		}
	}

	public ngOnInit(): void {
		const activatedRouteDelay: number = 0;
		this._activatedRoute.params
			.pipe(
				takeUntil(this._destroySubject$),
				delay(activatedRouteDelay)
			).subscribe((params: Params) => {
				this.statisticCategory = params.statisticCategory;
				this.statisticSubCategory = params.statisticSubCategory;
				this._statisticElement = params.statisticElement;
				this.navigateStatisticCategoryRoute();
			});

		this._store$.select(selectUserList)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((userList: User[]) => {
				if (Boolean(userList)) {
					this._facadeDonationStatisticListService.initUserList(userList);
				}
			});
		this._store$.select(selectDonationList)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((donationList: Donation[]) => {
				if (Boolean(donationList)) {
					this._facadeDonationStatisticListService.initDonationList(donationList);
				}
			});
		this._store$.select(selectStatisticData)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((statisticData: DonationStatisticInterface[]) => {
				if (Boolean(statisticData)) {
					this.statisticData = statisticData;
				}
			});
		this._store$.select(selectIsInitedStatisticDataByCost)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((isInitedStatisticDataByCost: boolean) => {
				this.isInitedStatisticDataByCost = isInitedStatisticDataByCost;
			});
		this._store$.select(selectIsInitedStatisticDataByTree)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((isInitedStatisticDataByTree: boolean) => {
				this.isInitedStatisticDataByTree = isInitedStatisticDataByTree;
			});
		this._store$.select(selectIsStatisticDataSortedByIncrease)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((statisticDataIsSortedByIncrease: boolean) => {
				this.statisticDataIsSortedByIncrease = statisticDataIsSortedByIncrease;
			});
		this._store$.select(selectIsStatisticDataSortedByDecrease)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((statisticDataIsSortedByDecrease: boolean) => {
				this.statisticDataIsSortedByDecrease = statisticDataIsSortedByDecrease;
			});
		this._store$.select(selectIsInitedAllDataStatistic)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((isInitedAllDataStatistic: boolean) => {
				this.isInitedAllDataStatistic = isInitedAllDataStatistic;
			});
		this._store$.select(selectIsInitedTopTenDataStatistic)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((isInitedTopTenDataStatistic: boolean) => {
				this.isInitedTopTenDataStatistic = isInitedTopTenDataStatistic;
			});

	}

	public ngAfterViewInit(): void {
		this._zone.runOutsideAngular(() => {
			am4core.useTheme(am4themes_animated);

			const chart: am4charts.XYChart = am4core.create('-app-all-donators__chart', am4charts.XYChart);
			chart.hiddenState.properties.opacity = 0;

			const optionsMinPolylineStep: number = 5;
			am4core.options.minPolylineStep = optionsMinPolylineStep;

			this._store$.select(selectStatisticData)
				.pipe(
					takeUntil(this._destroySubject$)
				).subscribe((statisticData: DonationStatisticInterface[]) => {
					if (Boolean(statisticData)) {
						chart.data = statisticData;
					}
				});

			const categoryAxis: am4charts.CategoryAxis<am4charts.AxisRenderer> = chart.xAxes.push(new am4charts.CategoryAxis());
			categoryAxis.renderer.grid.template.location = 0;
			categoryAxis.dataFields.category = 'name';
			const categoryAxisMinGridDistance: number = 15;
			categoryAxis.renderer.minGridDistance = categoryAxisMinGridDistance;
			const categoryAxisGridLocation: number = 0.5;
			categoryAxis.renderer.grid.template.location = categoryAxisGridLocation;
			categoryAxis.renderer.grid.template.strokeDasharray = '1,3';
			const categoryAxisLabelsRotation: number = -90;
			categoryAxis.renderer.labels.template.rotation = categoryAxisLabelsRotation;
			categoryAxis.renderer.labels.template.horizontalCenter = 'left';
			const categoryAxisLabelsLocation: number = 0.5;
			categoryAxis.renderer.labels.template.location = categoryAxisLabelsLocation;
			categoryAxis.fontWeight = '700';

			categoryAxis.renderer.labels.template.adapter.add('dx', (dx: number, target: am4charts.AxisLabel) => {
				return -target.maxRight / 2;
			});

			const valueAxis: am4charts.ValueAxis<am4charts.AxisRenderer> = chart.yAxes.push(new am4charts.ValueAxis());
			valueAxis.tooltip.disabled = true;
			valueAxis.renderer.ticks.template.disabled = true;
			valueAxis.renderer.axisFills.template.disabled = true;
			valueAxis.fontWeight = '700';

			const series: am4charts.ColumnSeries = chart.series.push(new am4charts.ColumnSeries());
			series.dataFields.categoryX = 'name';
			series.dataFields.valueY = 'points';

			series.sequencedInterpolation = true;
			series.fillOpacity = 1;
			series.strokeOpacity = 1;
			const seriesColumnsWidth: number = 3.5;
			series.columns.template.width = seriesColumnsWidth;
			series.tooltip.pointerOrientation = 'horizontal';

			const shadow: am4core.DropShadowFilter = series.columns.template.filters.push(new am4core.DropShadowFilter());
			const shadowOpacity: number = 0.1;
			shadow.opacity = shadowOpacity;

			const hoverState: am4core.SpriteState<
				am4charts.IColumnProperties,
				am4charts.IColumnAdapters
			> = series.columns.template.states.create('hover');
			hoverState.properties.fill = am4core.color('#396478');

			const hoverShadow: am4core.DropShadowFilter = hoverState.filters.push(new am4core.DropShadowFilter());
			const hoverShadowDx: number = 6;
			hoverShadow.dx = hoverShadowDx;
			const constHoverShadowOpacity: number = 0.3;
			hoverShadow.opacity = constHoverShadowOpacity;

			this._store$.select(selectIsInitedStatisticDataByTree)
				.pipe(
					takeUntil(this._destroySubject$)
				).subscribe((isInitedStatisticDataByTree: boolean) => {
					if (isInitedStatisticDataByTree) {
						series.tooltipText = '{categoryX}: [bold]{valueY}th[/b]';
					} else {
						series.tooltipText = '{categoryX}: [bold]{valueY}$[/b]';
					}
				});

			chart.cursor = new am4charts.XYCursor();

			chart.scrollbarX = new am4core.Scrollbar();
			chart.scrollbarY = new am4core.Scrollbar();

			this._chart = chart;
		});
	}

	public ngOnDestroy(): void {
		this._destroySubject$.next(true);
		this._destroySubject$.complete();
		this._zone.runOutsideAngular(() => {
			if (this._chart) {
				this._chart.dispose();
			}
		});
	}

	public switchStatisticRouter(statisticHtmlELement: HTMLElement, statisticSubCategoryElement?: HTMLElement): void {
		const statisticELementName: string = statisticHtmlELement.title.toLowerCase().split(' ').join('-');
		if (Boolean(statisticSubCategoryElement)) {
			const statisticSubCategoryElementName: string = statisticSubCategoryElement.innerText
				.toLowerCase()
				.split(' ')
				.join('-') + `-${this.statisticCategory}`;
			this.navigateStatisticRouter(statisticSubCategoryElementName, statisticELementName);
		} else {
			this.navigateStatisticRouter(this.statisticSubCategory, statisticELementName);
		}
	}

	public sortTop(): void {
		this._facadeDonationStatisticListService.sortTopDonationStatisticList();
	}

	public sortBottom(): void {
		this._facadeDonationStatisticListService.sortBottomDonationStatisticList();
	}

	public navigateStatisticRouter(statisticSubCategoryName: string, statisticElementName: string): void {
		this._router.navigate([
			'/donation-statistic',
			'statistic',
			this.statisticCategory,
			statisticSubCategoryName,
			statisticElementName
		]);
	}

}
