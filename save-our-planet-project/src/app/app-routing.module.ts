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
		loadChildren: () => import('./country-map/country-map.module').then((m: any) => m.CountryMapModule),
	},
	{
		path: 'countries',
		loadChildren: () => import('./country-list/country-list.module').then((m: any) => m.CountryListModule),
	},
	{
		path: 'trees',
		loadChildren: () => import('./tree-list/tree-list.module').then((m: any) => m.TreeListModule)
	},
	{
		path: 'donation-statistic',
		loadChildren: () => import('./donation-statistic/donation-statistic.module').then((m: any) => m.DonationStatisticModule)
	},
	{
		path: 'user-profile',
		loadChildren: () => import('./user-profile/user-profile.module').then((m: any) => m.UserProfileModule)
	},
	{
		path: 'registration',
		loadChildren: () => import('./registration/registration.module').then((m: any) => m.RegistrationModule)
	},
	{
		path: 'donation',
		loadChildren: () => import('./donation-list-before-registration/donation-list-before-registration.module')
			.then((m: any) => m.DonationListBeforeRegistrationModule)
	},
	{
		path: 'about',
		loadChildren: () => import('./about/about.module').then((m: any) => m.AboutModule)
	},
	{
		path: 'contacts',
		loadChildren: () => import('./contacts/contacts.module').then((m: any) => m.ContactsModule)
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
