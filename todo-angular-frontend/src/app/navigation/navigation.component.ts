import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../shared/service/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  userName: string;

  constructor(public loginService: AuthenticationService) {
  }

  ngOnInit() {
    this.subscribeToUserName();
  }

  private subscribeToUserName() {
    this.loginService.getDecodedAuthenticatedUserIdentifier().subscribe( inUserName => {
        this.userName = inUserName;
    });
  }


}
