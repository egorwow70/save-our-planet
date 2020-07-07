import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'formatUserProfileTreeAmount'
})
export class FormatUserProfileTreeAmountPipe implements PipeTransform {

	public transform(value: number): string {
		return (String(value) + 'th');
	}
}
