import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'formatUserMedicalPoints'
})
export class FormatUserMedicalPointsPipe implements PipeTransform {

	public transform(userMedicalPoints: number): string {
		return `${userMedicalPoints}p`;
	}

}
