import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

	private _windowScrollHeight: number = 500;

	// tslint:disable-next-line: no-empty
	constructor() { }

	public ngOnInit(): void {
		const leftDesert: HTMLElement = document.querySelector('.-app-about__parallax-item_desert-left');
		const rightDesert: HTMLElement = document.querySelector('.-app-about__parallax-item_desert-right');

		window.addEventListener('scroll', () => {
			if (window.scrollY > this._windowScrollHeight) {
				leftDesert.classList.add('-app-about__parallax-item_desert-left-invisible');
				rightDesert.classList.add('-app-about__parallax-item_desert-right-invisible');
			} else {
				leftDesert.classList.remove('-app-about__parallax-item_desert-left-invisible');
				rightDesert.classList.remove('-app-about__parallax-item_desert-right-invisible');
			}
		});
	}

}
