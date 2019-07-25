import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../shared/entity/User';


@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  user: User;
  password2: string;
  same: boolean;
  loginAfter: boolean;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.user = new User('' , '' , '' , '' , '' );
  }

  save() {

  }

  cancel() {
    this.router.navigate([`login`]);
  }

}


