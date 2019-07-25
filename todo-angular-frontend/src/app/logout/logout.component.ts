import {Component, OnInit} from '@angular/core';
import {TriggerNotificationService} from '../shared/service/trigger-notification.service';
import {InternNotificationType} from '../shared/entity/InternNotificationType';
import {Router} from '@angular/router';
import {AuthenticationService} from '../shared/service/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private authenticationServiceService: AuthenticationService,
              private notification: TriggerNotificationService,
              private router: Router) {
  }

  ngOnInit() {
    this.authenticationServiceService.logout();
    this.notification.triggerNotification(InternNotificationType.SUCCESS, 'Logged out successfully', //
      'You are going to be re-directed to the login page...', 5000);
    setTimeout(() => {
        this.router.navigate(['login']);
        this.notification.triggerNotification(InternNotificationType.INFO, 'You are now in the login page', '', 5000);
      },
      6000
    );
  }

}
