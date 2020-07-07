import { NgModule } from '@angular/core';
import { TreeListComponent } from './tree-list.component';
import { TreeCategoryComponent } from '../tree-category/tree-category.component';
import { TreeProductComponent } from '../tree-product/tree-product.component';
import { TreeComponent } from '../tree/tree.component';
import { TreeListRoutingModule } from './tree-list-routing.module';
import { CommonModule } from '@angular/common';
import { CanProceedToTreeCategoryGuard } from 'src/app/guards/tree-list/can-proceed-to-tree-category.guard';
import { CanProceedToTreeGuard } from 'src/app/guards/tree-list/can-proceed-to-tree.guard';
import { CanLeaveTreeCategoryGuard } from 'src/app/guards/tree-list/can-leave-tree-category.guard';
import { FormatTreeCategoryTitlePipe } from 'src/app/pipes/tree-list/format-tree-category-title.pipe';

@NgModule({
	declarations: [
		TreeListComponent,
		TreeCategoryComponent,
		TreeProductComponent,
		TreeComponent,
		FormatTreeCategoryTitlePipe
	],
	imports: [
		TreeListRoutingModule,
		CommonModule,
	],
	providers: [
		CanProceedToTreeCategoryGuard,
		CanProceedToTreeGuard,
		CanLeaveTreeCategoryGuard
	],
	bootstrap: [TreeListComponent]
})
export class TreeListModule {

}
