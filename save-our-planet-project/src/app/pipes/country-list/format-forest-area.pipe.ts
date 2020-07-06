import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'formatForestArea'
})
export class FormatForestAreaPipe implements PipeTransform {

	public transform(value: number): string {
		const currentCountryForestArea: number = value;
		const currentCountryForestAreaInfo: string = `${currentCountryForestArea}%`;
		return currentCountryForestAreaInfo;
	}

}
