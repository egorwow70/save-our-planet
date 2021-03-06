import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-tree-list',
	templateUrl: './tree-list.component.html',
	styleUrls: ['./tree-list.component.scss', './tree-list-media.component.scss']
})
export class TreeListComponent {

	public isAudioMuted: boolean;

	constructor(
		private _router: Router
	) { }

	public switchRouter(treeTypeHtmlElement: HTMLElement): void {
		const treeTypeContent: string = treeTypeHtmlElement.innerHTML;
		const treeCategory: string = treeTypeContent.toLowerCase().split(' ').join('-');
		this._router.navigate(['/trees', 'tree-category', treeCategory]);
	}

	public toggleAudioVolume(): void {
		this.isAudioMuted = !this.isAudioMuted;
	}
}
