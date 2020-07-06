import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { StatisticCategoryType } from '../../models/donation-statistic-list/statistic-category-type';
import { StatisticSubCategoryType } from '../../models/donation-statistic-list/statistic-sub-category-type';
import { StatisticElementType } from '../../models/donation-statistic-list/statistic-element-type';

@Injectable()
export class CanProceedToStatisticCategoryGuard implements CanActivate {

	private checkStatisticCategory(statisticCategory: string): void {
		let isExistStatisticCategory: boolean;
		for (const currentCategory in StatisticCategoryType) {
			if (statisticCategory === StatisticCategoryType[currentCategory]) {
				isExistStatisticCategory = true;
			}
		}
		if (!isExistStatisticCategory) {
			const errorMessage: string = `This statistic category (${statisticCategory}) does not exist!`;
			throw new Error(errorMessage);
		}
	}

	private checkStatisticSubCategory(statisticSubCategory: string): void {
		let isExistStatisticSubCategory: boolean;
		for (const currentSubCategory in StatisticSubCategoryType) {
			if (statisticSubCategory === StatisticSubCategoryType[currentSubCategory]) {
				isExistStatisticSubCategory = true;
			}
		}
		if (!isExistStatisticSubCategory) {
			const errorMessage: string = `This statistic sub category (${statisticSubCategory}) does not exist!`;
			throw new Error(errorMessage);
		}
	}

	private checkStatisticElement(statisticElement: string): void {
		let isExistStatisticElement: boolean;
		for (const currentSubCategory in StatisticElementType) {
			if (statisticElement === StatisticElementType[currentSubCategory]) {
				isExistStatisticElement = true;
			}
		}
		if (!isExistStatisticElement) {
			const errorMessage: string = `This statistic element (${statisticElement}) does not exist!`;
			throw new Error(errorMessage);
		}
	}

	private checkRouterParams(
		statisticCategory: string,
		statisticSubCategory: string,
		statisticElement: string
	): void {
		this.checkStatisticCategory(statisticCategory);
		this.checkStatisticSubCategory(statisticSubCategory);
		this.checkStatisticElement(statisticElement);
	}

	public canActivate(next: ActivatedRouteSnapshot): boolean {
		const currentStatisticCategory: string = next.params.statisticCategory;
		const currentStatisticSubCategory: string = next.params.statisticSubCategory;
		const currentStatisticElement: string = next.params.statisticElement;
		this.checkRouterParams(
			currentStatisticCategory,
			currentStatisticSubCategory,
			currentStatisticElement
		);
		return true;
	}

}
