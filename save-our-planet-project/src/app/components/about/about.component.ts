import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {

	public static windowScrollHeight: number = 500;

	public static leftDesert: HTMLElement;
	public static rightDesert: HTMLElement;
	// tslint:disable-next-line: no-empty
	constructor() { }

	public static isScrolling(): void {
		if (window.scrollY > AboutComponent.windowScrollHeight) {
			AboutComponent.leftDesert.classList.add('-app-about__parallax-item_desert-left-invisible');
			AboutComponent.rightDesert.classList.add('-app-about__parallax-item_desert-right-invisible');
		} else {
			AboutComponent.leftDesert.classList.remove('-app-about__parallax-item_desert-left-invisible');
			AboutComponent.rightDesert.classList.remove('-app-about__parallax-item_desert-right-invisible');
		}
	}

	public ngOnInit(): void {
		AboutComponent.leftDesert = document.querySelector('.-app-about__parallax-item_desert-left');
		AboutComponent.rightDesert = document.querySelector('.-app-about__parallax-item_desert-right');

		window.addEventListener('scroll', AboutComponent.isScrolling);
	}

	public ngOnDestroy(): void {
		window.removeEventListener('scroll', AboutComponent.isScrolling);
	}

}
