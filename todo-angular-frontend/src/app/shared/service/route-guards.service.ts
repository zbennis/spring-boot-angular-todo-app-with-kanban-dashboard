import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';
import {TriggerNotificationService} from './trigger-notification.service';
import {InternNotificationType} from '../entity/InternNotificationType';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardsService implements CanActivate {

  constructor(private router: Router,
              private loginService: AuthenticationService,
              private notification: TriggerNotificationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.loginService.isUserLoggedIn()) {
      return true;
    }
    this.router.navigate(['login']).then().catch(() => {
      this.notification.triggerNotification(InternNotificationType.ERROR,
        'You are not allowed to navigate to this page', '', 5000);
    });
    return false;
  }
}
