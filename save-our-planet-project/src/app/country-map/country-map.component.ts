import { Component, OnInit, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import { takeUntil } from 'rxjs/operators';
import { Capital } from '../models/country-list/capital';
import {
	selectCountriesForestAreaData,
	selectCapitalsCoordinatesData,
	selectIsMapMode,
	selectIsGlobeMode,
	selectIsShowCapitalsMode
} from '../store/country-list/country-list.selectors';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { FacadeServiceCountryList } from '../store/country-list/country-list.facade';
import { IDisposer } from '@amcharts/amcharts4/core';
import { CountryCapitalInterface } from '../models/country-list/country-capital-interface';
import { SpritePointerTypeEvent } from '@amcharts/amcharts4/.internal/core/SpriteEvents';
import { ResizeSensor } from '@amcharts/amcharts4/.internal/core/utils/ResizeSensor';

@Component({
	selector: 'app-country-map',
	templateUrl: './country-map.component.html',
	styleUrls: ['./country-map.component.scss']
})
export class CountryMapComponent implements OnInit, AfterViewInit, OnDestroy {

	public static currentClickCountryName: string;

	private _destroySubject$: Subject<boolean> = new Subject();

	private _chart: am4maps.MapChart;
	private _countriesForestAreaData: CountryCapitalInterface[];
	private _capitalsCoordinatesData: CountryCapitalInterface[];

	public isMapMode: boolean;
	public isGlobeMode: boolean;
	public isShowCapitalsMode: boolean;

	public clickCountryEvent: IDisposer;

	public infoMode: boolean;

	constructor(
		private _zone: NgZone,
		private _store$: Store,
		private _facadeCountryListService: FacadeServiceCountryList,
	) {

	}

	public ngOnInit(): void {
		this._store$.select(selectCountriesForestAreaData)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((countriesForestAreaData: any) => {
				this._countriesForestAreaData = countriesForestAreaData;
			});

		this._store$.select(selectCapitalsCoordinatesData)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((capitalsCoordinatesData: Capital[]) => {
				this._capitalsCoordinatesData = capitalsCoordinatesData;
			});
		this._store$.select(selectIsMapMode)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((isMapMode: boolean) => {
				this.isMapMode = isMapMode;
			});
		this._store$.select(selectIsGlobeMode)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((isGlobeMode: boolean) => {
				this.isGlobeMode = isGlobeMode;
			});
		this._store$.select(selectIsShowCapitalsMode)
			.pipe(
				takeUntil(this._destroySubject$)
			).subscribe((isShowCapitalsMode: boolean) => {
				this.isShowCapitalsMode = isShowCapitalsMode;
			});

	}

	public ngAfterViewInit(): void {
		this._zone.runOutsideAngular(() => {
			am4core.useTheme(am4themes_animated);
			const chart: am4maps.MapChart = am4core.create('-app-country-map__chart', am4maps.MapChart);

			const grid: am4maps.GraticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
			grid.mapLines.template.line.stroke = am4core.color('#8d8d8d');
			grid.toBack();

			const graticuleSeries: am4maps.GraticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
			graticuleSeries.mapLines.template.line.stroke = am4core.color('#454a58');
			graticuleSeries.fitExtent = false;

			const chartDeltaLongitude: number = 20;
			const chartDeltaLatitude: number = -20;
			chart.deltaLongitude = chartDeltaLongitude;
			chart.deltaLatitude = chartDeltaLatitude;
			chart.adapter.add('deltaLatitude', (deltaLatitude: number) => {
				const minValue: number = -90;
				const maxValue: number = 90;
				return am4core.math.fitToRange(deltaLatitude, minValue, maxValue);
			});

			chart.geodata = am4geodata_worldLow;

			const polygonSeries: am4maps.MapPolygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
			polygonSeries.useGeodata = true;

			const country: am4maps.MapPolygon = polygonSeries.mapPolygons.template;
			country.tooltipText = '[bold]{name} (forest area: {value}%)[/]';
			country.fill = am4core.color('#1f640a');
			country.fillOpacity = 1;
			country.stroke = am4core.color('#454a58');
			const countryBorderWidth: number = 0.5;
			country.strokeWidth = countryBorderWidth;
			country.propertyFields.fill = 'fill';

			const countryHoverState: am4core.SpriteState<
				am4maps.IMapPolygonProperties,
				am4maps.IMapPolygonAdapters
			> = country.states.create('hover');
			countryHoverState.properties.fill = am4core.color('#a3fc88');

			polygonSeries.heatRules.push({
				property: 'fill',
				target: polygonSeries.mapPolygons.template,
				min: am4core.color('#ffffff'),
				max: am4core.color('#1f640a')
			});

			polygonSeries.data = JSON.parse(JSON.stringify(this._countriesForestAreaData));

			const imageSeries: am4maps.MapImageSeries = chart.series.push(new am4maps.MapImageSeries());
			const capital: am4maps.MapImage = imageSeries.mapImages.template;
			capital.propertyFields.latitude = 'latitude';
			capital.propertyFields.longitude = 'longitude';
			const circle: am4core.Circle = capital.createChild(am4core.Circle);
			const circleRadius: number = 4;
			circle.radius = circleRadius;
			circle.fill = am4core.color('#ffffff');
			circle.stroke = am4core.color('#000000');
			circle.strokeWidth = 1;
			circle.nonScaling = true;
			circle.tooltipText = '{name}';

			this._store$.select(selectIsShowCapitalsMode)
				.pipe(
					takeUntil(this._destroySubject$)
				).subscribe((isShowCapitalsMode: boolean) => {
					if (isShowCapitalsMode) {
						imageSeries.data = this._capitalsCoordinatesData;
					} else {
						imageSeries.data = null;
					}
				});

			chart.zoomControl = new am4maps.ZoomControl();
			const chartSliderHeight: number = 100;
			chart.zoomControl.slider.height = chartSliderHeight;

			const homeButton: am4core.Button = chart.chartContainer.createChild(am4core.Button);
			homeButton.icon = new am4core.Sprite();
			const homeButtonTopPadding: number = 7;
			const homeButtonRightPadding: number = 5;
			const homeButtonBottomPadding: number = 7;
			const homeButtonLeftPadding: number = 5;
			homeButton.padding(homeButtonTopPadding, homeButtonRightPadding, homeButtonBottomPadding, homeButtonLeftPadding);
			const homeButtonWidth: number = 30;
			homeButton.width = homeButtonWidth;
			homeButton.icon.path = 'M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8';
			const homeButtonBottomMargin: number = 10;
			homeButton.marginBottom = homeButtonBottomMargin;
			homeButton.parent = chart.zoomControl;
			homeButton.insertBefore(chart.zoomControl.plusButton);
			homeButton.events.on('hit', (event: {
				type: 'hit';
				target: am4core.Button;
			} & SpritePointerTypeEvent & am4core.SpritePointEvent & am4core.SpriteMouseTouchEvent) => {
				chart.goHome();
			});

			const chartWaterOpacity: number = 0.1;
			chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color('#ffffff');
			chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = chartWaterOpacity;

			this.clickCountryEvent = country.events.on('hit', (event: {
				type: 'hit';
				target: am4maps.MapPolygon;
			} & SpritePointerTypeEvent & am4core.SpritePointEvent & am4core.SpriteMouseTouchEvent) => {
				event.target.series.chart.zoomToMapObject(event.target);
				const currentCountry: any = event.target.dataItem.dataContext.valueOf();
				CountryMapComponent.currentClickCountryName = currentCountry.name;
			});

			chart.seriesContainer.events.disableType('doublehit');
			chart.chartContainer.background.events.disableType('doublehit');

			this._store$.select(selectIsGlobeMode)
				.pipe(
					takeUntil(this._destroySubject$)
				).subscribe((isGlobeMode: boolean) => {
					if (isGlobeMode) {
						chart.projection = new am4maps.projections.Orthographic();
						chart.panBehavior = 'rotateLongLat';

						const globeTopChartPadding: number = 70;
						const globeRightChartPadding: number = 20;
						const globeLeftChartPadding: number = 70;
						const globeBottomChartPadding: number = 20;
						chart.padding(globeTopChartPadding, globeRightChartPadding, globeLeftChartPadding, globeBottomChartPadding);

						const chartLineStrokeOpacity: number = 0.15;
						grid.mapLines.template.line.strokeOpacity = chartLineStrokeOpacity;
						const chartMapLineStrokeOpacity: number = 0.08;
						graticuleSeries.mapLines.template.line.strokeOpacity = chartMapLineStrokeOpacity;

					} else {
						chart.projection = new am4maps.projections.Projection();
						chart.panBehavior = 'rotateLong';

						const topChartPadding: number = 60;
						const rightChartPadding: number = 0;
						const leftChartPadding: number = 0;
						const bottomChartPadding: number = 0;
						chart.padding(topChartPadding, rightChartPadding, leftChartPadding, bottomChartPadding);

						grid.mapLines.template.line.strokeOpacity = 0;
						graticuleSeries.mapLines.template.line.strokeOpacity = 0;
					}
				});
			this._chart = chart;
		});
	}

	public ngOnDestroy(): void {
		// tslint:disable-next-line: deprecation
		this._chart.svgContainer.resizeSensor.reset();
		this._zone.runOutsideAngular(() => {
			if (this._chart) {
				this._chart.dispose();
				this.clickCountryEvent.dispose();
			}
		});
		this._destroySubject$.next(true);
		this._destroySubject$.complete();
	}

	public searchCountry(countryName: string): void {
		this._facadeCountryListService.searchCurrentCountry(countryName);
		this._facadeCountryListService.searchPreviousCountry(countryName);
		this._facadeCountryListService.searchNextCountry(countryName);
	}

	public toggleMapMode(): void {
		this._facadeCountryListService.toggleMapMode();
	}

	public toggleCapitalsMode(): void {
		this._facadeCountryListService.toggleCapitalsMode();
	}

	public toggleInfoMode(): void {
		this.infoMode = !this.infoMode;
	}

}
