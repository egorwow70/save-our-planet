import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CanComponentDeactivate } from '../../models/can-component-deactivate/can-component-deactivate-interface';

@Injectable()
export class CanLeaveTreeGuard implements CanDeactivate<CanComponentDeactivate> {
	public canDeactivate(component: CanComponentDeactivate): boolean {
		return component.canDeactivate ? component.canDeactivate() : true;
	}

}
