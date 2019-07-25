import {Component} from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo-angular-frontend';


  public options = {
    position: ['top', 'right'],
    timeOut: 5000,
  };

}
