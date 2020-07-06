import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-tree-list',
	templateUrl: './tree-list.component.html',
	styleUrls: ['./tree-list.component.scss']
})
export class TreeListComponent {

	constructor(
		private _router: Router
	) { }

	public switchRouter(treeTypeHtmlElement: HTMLElement): void {
		const treeTypeContent: string = treeTypeHtmlElement.innerHTML.toLowerCase();
		const treeCategory: string = treeTypeContent.split(' ').join('-');
		this._router.navigate(['/trees', 'tree-category', treeCategory]);
	}
}
