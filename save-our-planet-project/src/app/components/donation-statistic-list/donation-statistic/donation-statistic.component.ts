import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-donation-statistic',
	templateUrl: './donation-statistic.component.html',
	styleUrls: ['./donation-statistic.component.scss']
})
export class DonationStatisticComponent {

	constructor(
		private _router: Router,
	) { }

	public switchStatisticRouter(statisticCategoryElem: HTMLElement): void {
		const statisticCategoryName: string = statisticCategoryElem.innerText.toLowerCase();
		const defaultStatisticElement: string = 'by-cost';
		const defaultStatisticSubCategory: string = 'all-' + statisticCategoryName;
		this._router.navigate([
			'/donation-statistic',
			'statistic',
			statisticCategoryName,
			defaultStatisticSubCategory,
			defaultStatisticElement
		]);
	}

}
