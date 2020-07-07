import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'formatDonationBeforeRegistrationTreeAmount'
})
export class FormatDonationBeforeRegistrationTreeAmountPipe implements PipeTransform {

	public transform(value: number): string {
		return (String(value) + 'th');
	}
}
