import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'formatArea'
})
export class FormatAreaPipe implements PipeTransform {

	public transform(value: number): string {
		const currentCountryArea: string = value.toString();
		const currentCountryAreaInfoWithSpacesAfterEachThirdCharacters: string = currentCountryArea
			.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1' + ' ');
		const countryAreaInfo: string = currentCountryAreaInfoWithSpacesAfterEachThirdCharacters + ' sq/km';
		return countryAreaInfo;
	}

}
