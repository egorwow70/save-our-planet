import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DonationStatisticComponent } from './donation-statistic.component';
import { StatisticCategoryComponent } from '../statistic-category/statistic-category.component';
import { CanProceedToStatisticCategoryGuard } from '../guards/donation-statistic-list/can-proceed-to-statistic-category.guard';

const routes: Routes = [
	{
		path: '',
		component: DonationStatisticComponent
	},
	{
		path: 'statistic/:statisticCategory/:statisticSubCategory/:statisticElement',
		component: StatisticCategoryComponent,
		canActivate: [CanProceedToStatisticCategoryGuard]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DonationStatisticRoutingModule {

}
