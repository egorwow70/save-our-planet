import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'formatTreeCategoryTitle'
})
export class FormatTreeCategoryTitlePipe implements PipeTransform {

	public transform(value: string): string {
		return value.split('-').map((currentWord: string) => {
			return currentWord[0].toUpperCase() + currentWord.slice(1);
		}).join(' ');
	}

}
