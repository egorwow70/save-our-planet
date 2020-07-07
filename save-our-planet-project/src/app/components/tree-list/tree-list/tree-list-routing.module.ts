import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TreeListComponent } from './tree-list.component';
import { TreeCategoryComponent } from '../tree-category/tree-category.component';
import { TreeComponent } from '../tree/tree.component';
import { CanProceedToTreeCategoryGuard } from 'src/app/guards/tree-list/can-proceed-to-tree-category.guard';
import { CanProceedToTreeGuard } from 'src/app/guards/tree-list/can-proceed-to-tree.guard';
import { CanLeaveTreeCategoryGuard } from 'src/app/guards/tree-list/can-leave-tree-category.guard';

const routes: Routes = [
	{
		path: '',
		component: TreeListComponent
	},
	{
		path: 'tree-category/:categoryName',
		component: TreeCategoryComponent,
		canActivate: [CanProceedToTreeCategoryGuard],
		canDeactivate: [CanLeaveTreeCategoryGuard],
		children: [{
			path: 'tree/:treeName',
			component: TreeComponent,
			canActivate: [CanProceedToTreeGuard]
		}]
	},
	{
		path: 'tree-category/:categoryName#header',
		component: TreeCategoryComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TreeListRoutingModule {

}
