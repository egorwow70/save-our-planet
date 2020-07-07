import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'formatUserAge'
})
export class FormatUserAgePipe implements PipeTransform {

	public transform(userAge: number): string {
		return `${userAge} y.o.`;
	}

}
