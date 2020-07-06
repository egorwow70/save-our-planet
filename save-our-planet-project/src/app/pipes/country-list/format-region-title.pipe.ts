import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'formatRegionTitle'
})
export class FormatRegionTitlePipe implements PipeTransform {

	public transform(value: string): string {
		return value.split('-').map((currentWord: string) => {
			return currentWord[0].toUpperCase() + currentWord.slice(1);
		}).join(' ');
	}

}
