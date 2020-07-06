import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { RegistrationType } from '../../models/user-list/registration-type';

@Injectable()
export class CanProceedToRegistrationGuard implements CanActivate {
	public canActivate(next: ActivatedRouteSnapshot): boolean {
		const currentRegistrationMode: string = next.params.registrationMode;
		if (currentRegistrationMode !== RegistrationType.RM && currentRegistrationMode !== RegistrationType.LM) {
			const errorMessage: string = `This mode (${currentRegistrationMode}) does not exist, try registration-mode or login-mode`;
			throw new Error(errorMessage);
		}
		return true;
	}

}
