import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../shared/service/authentication-service.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private loginService: AuthenticationService) {
  }

  ngOnInit() {

  }


}
