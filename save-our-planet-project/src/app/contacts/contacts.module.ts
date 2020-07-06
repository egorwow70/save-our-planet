import { NgModule } from '@angular/core';
import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		ContactsComponent,
	],
	imports: [
		ContactsRoutingModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [],
	bootstrap: [ContactsComponent]
})
export class ContactsModule {

}
