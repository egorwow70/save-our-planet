import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DonationStatisticComponent } from './donation-statistic.component';
import { StatisticCategoryComponent } from '../statistic-category/statistic-category.component';
import { DonationStatisticRoutingModule } from './donation-statistic-routing.module';
import { CanProceedToStatisticCategoryGuard } from '../guards/donation-statistic-list/can-proceed-to-statistic-category.guard';

@NgModule({
	declarations: [
		DonationStatisticComponent,
		StatisticCategoryComponent
	],
	imports: [
		DonationStatisticRoutingModule,
		CommonModule
	],
	providers: [
		CanProceedToStatisticCategoryGuard
	],
	bootstrap: [DonationStatisticComponent]
})
export class DonationStatisticModule {

}
