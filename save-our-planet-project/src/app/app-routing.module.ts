import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'home'
	},
	{
		path: 'home',
		loadChildren: () => import('./components/country-map/country-map.module').then((m: any) => m.CountryMapModule),
	},
	{
		path: 'countries',
		loadChildren: () => import('./components/country-list/country-list/country-list.module').then((m: any) => m.CountryListModule),
	},
	{
		path: 'trees',
		loadChildren: () => import('./components/tree-list//tree-list/tree-list.module').then((m: any) => m.TreeListModule)
	},
	{
		path: 'donation-statistic',
		loadChildren: () => import('./components/donation-statistic-list/donation-statistic/donation-statistic.module')
			.then((m: any) => m.DonationStatisticModule)
	},
	{
		path: 'user-profile',
		loadChildren: () => import('./components/user-list/user-profile/user-profile.module').then((m: any) => m.UserProfileModule)
	},
	{
		path: 'registration',
		loadChildren: () => import('./components/user-list/registration/registration.module').then((m: any) => m.RegistrationModule)
	},
	{
		path: 'donation',
		loadChildren: () => import('./components/donation-list/donation-list-before-registration/donation-list-before-registration.module')
			.then((m: any) => m.DonationListBeforeRegistrationModule)
	},
	{
		path: 'about',
		loadChildren: () => import('./components/about/about.module').then((m: any) => m.AboutModule)
	},
	{
		path: 'contacts',
		loadChildren: () => import('./components/contacts/contacts.module').then((m: any) => m.ContactsModule)
	},
	{
		path: '**',
		redirectTo: 'not-found'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
