import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TriggerNotificationService} from '../shared/service/trigger-notification.service';
import {InternNotificationType} from '../shared/entity/InternNotificationType';
import {AuthenticationService} from '../shared/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // TODO implement security
  username = 'test';
  password = 'test';

  constructor(private router: Router, private activeRoute: ActivatedRoute,
              private authenticatorService: AuthenticationService,
              private notification: TriggerNotificationService) {
  }

  ngOnInit() {
  }

  handleLogin(): void {
    let loginMessage: string;
    if (this.authenticatorService.authenticate(this.username, this.password)) {
      this.router.navigate([`welcome/${this.authenticatorService.getAuthenticatedUserIdentifier()}`]);
      loginMessage = 'Successfully logged in.';
      this.notification.triggerNotification(InternNotificationType.SUCCESS, loginMessage, '', 5000);
    } else {
      loginMessage = 'Login failed check your credentials.';
      this.notification.triggerNotification(InternNotificationType.WARN, loginMessage, '', 5000);
    }
  }

}
