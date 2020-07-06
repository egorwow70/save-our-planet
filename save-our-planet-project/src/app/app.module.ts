import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { reducers } from './store/';
import { StoreModule } from '@ngrx/store';
import { CountryListEffects } from './store/country-list/country-list.effects';
import { TreeListEffects } from './store/tree-list/tree-list.effects';
import { UserListEffects } from './store/user-list/user-list.effects';
import { DonationListEffects } from './store/donation-list/donation-list.effects';
import { NotFoundModule } from './not-found/not-found.module';
import { TreeListDataService } from './services/tree-data.service';
import { UserListDataService } from './services/user-data.service';
import { DonationListDataService } from './services/donation-list-data.service';
import { CountryListDataService } from './services/country-data.service';
import { MyErrorHandler } from './my-error-handler/my-error-handler.module';
import { FacadeServiceCountryList } from './store/country-list/country-list.facade';
import { FacadeServiceDonationList } from './store/donation-list/donation-list.facade';
import { FacadeServiceDonationStatisticList } from './store/donation-statistic-list/donation-statistic-list.facade';
import { FacadeServiceTreeList } from './store/tree-list/tree-list.facade';
import { FacadeServiceUserList } from './store/user-list/user-list.facade';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		StoreModule.forRoot(reducers),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
		EffectsModule.forRoot([CountryListEffects, TreeListEffects, UserListEffects, DonationListEffects]),
		StoreRouterConnectingModule.forRoot(),
		NotFoundModule
	],
	providers: [
		CountryListDataService,
		TreeListDataService,
		UserListDataService,
		DonationListDataService,
		FacadeServiceCountryList,
		FacadeServiceDonationList,
		FacadeServiceDonationStatisticList,
		FacadeServiceTreeList,
		FacadeServiceUserList,
		{ provide: ErrorHandler, useClass: MyErrorHandler },
	],
	bootstrap: [AppComponent]
})
export class AppModule {

}
