import {Component, OnInit} from '@angular/core';
import {InternNotificationType} from '../shared/entity/InternNotificationType';
import {TriggerNotificationService} from '../shared/service/trigger-notification.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../shared/service/authentication.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(private notificationService: TriggerNotificationService,
              private loginService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.loginService.isUserLoggedIn()) {
      this.notificationService.triggerNotification(InternNotificationType.ERROR, 'Oops! something went wrong', //
        'You are going to be directed automatically to the home page in 10s', 5000);
      setTimeout(() => {
          this.router.navigate([`welcome/${this.loginService.getAuthenticatedUserIdentifier()}`]).then(() => {
            this.notificationService.triggerNotification(InternNotificationType.INFO, 'Welcome home again!', '', 5000);
          });

        }
        , 10000);

    } else {
      this.notificationService.triggerNotification(InternNotificationType.ERROR, 'Oops! something went wrong', //
        'You are going to be directed automatically to the login page in 5s', 5000);
      setTimeout(() => {
          this.router.navigate(['login']);
        }
        , 5000);
    }

  }

}
