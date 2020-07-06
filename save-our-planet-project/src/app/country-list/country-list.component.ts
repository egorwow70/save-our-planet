import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-country-list',
	templateUrl: './country-list.component.html',
	styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent {

	public menuMode: boolean = false;

	public asiaMenuMode: boolean = false;
	public europeMenuMode: boolean = false;
	public africaMenuMode: boolean = false;
	public oceaniaMenuMode: boolean = false;
	public americaMenuMode: boolean = false;

	constructor(
		private _router: Router
	) {

	}

	private takeNameOfContent(htmlElement: HTMLElement): string {
		const currentSubRegionContent: string[] = htmlElement.innerHTML.split(' ').filter((name: string) => Boolean(name));
		return currentSubRegionContent[0].toLowerCase();
	}

	public toggleMenuMode(): void {
		this.menuMode = !this.menuMode;
	}

	public returnMenuMode(): void {
		this.menuMode = !this.menuMode;
		this.asiaMenuMode = false;
		this.europeMenuMode = false;
		this.africaMenuMode = false;
		this.oceaniaMenuMode = false;
		this.americaMenuMode = false;
	}

	public toggleAsiaMenuMode(): void {
		this.asiaMenuMode = !this.asiaMenuMode;
	}

	public toggleEuropeMenuMode(): void {
		this.europeMenuMode = !this.europeMenuMode;
	}

	public toggleOceaniaMenuMode(): void {
		this.oceaniaMenuMode = !this.oceaniaMenuMode;
	}

	public toggleAfricaMenuMode(): void {
		this.africaMenuMode = !this.africaMenuMode;
	}

	public toggleAmericaMenuMode(): void {
		this.americaMenuMode = !this.americaMenuMode;
	}

	public switchRouter(regionHtmlElement: HTMLElement, subRegionHtmlElement: HTMLElement): void {
		const regionName: string = this.takeNameOfContent(regionHtmlElement);
		const subRegionName: string = this.takeNameOfContent(subRegionHtmlElement);
		this._router.navigate(['/countries', 'region', regionName, subRegionName]);
	}

}
