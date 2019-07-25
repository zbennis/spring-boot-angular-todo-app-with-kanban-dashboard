import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../shared/service/authentication.service';
import {TodoHttpClientService} from '../shared/service/todo-http-client-service.service';
import {TodoEntryState} from '../shared/entity/TodoEntryState';
import {TodoEntry} from '../shared/entity/TodoEntry';
import {TriggerNotificationService} from '../shared/service/trigger-notification.service';
import {InternNotificationType} from '../shared/entity/InternNotificationType';

@Component({
  selector: 'app-welcome',
  templateUrl: './kanban-dashboard.component.html',
  styleUrls: ['./kanban-dashboard.component.scss']
})
export class KanbanDashboardComponent implements OnInit {

  userName: string;

  // -------------------------
  ideaState: TodoEntry[] = [];
  todoState: TodoEntry[] = [];
  inProgressState: TodoEntry[] = [];
  doneState: TodoEntry[] = [];
  todoEntries: TodoEntry[];

  // -------------------------

  constructor(private loginService: AuthenticationService,
              private todoService: TodoHttpClientService,
              private triggerNotification: TriggerNotificationService ) {
  }

  ngOnInit() {

  }


  private getUserNameFromLoginService() {
    this.loginService.getDecodedAuthenticatedUserIdentifier().subscribe( observableUserName => {
        this.userName = observableUserName;
        this.divideList();
      } ,
      error1 => {
        this.triggerNotification.triggerNotification(InternNotificationType.ERROR ,
          'Oops! something wrong happened, please contact the admin'
          , '' , 5000 );
      });
  }

  private divideList() {

    this.todoService.getListOfTodoEntriesForUser(this.userName)//
      .subscribe(data => {
        this.todoEntries = data;
        this.todoEntries.map(entry => {
          if (entry.state === TodoEntryState.TODO.toString()) {
            this.todoState.push(entry);
          }
          if (entry.state === TodoEntryState.DONE.toString()) {
            this.doneState.push(entry);
          }
          if (entry.state === TodoEntryState.IDEA.toString()) {
            this.ideaState.push(entry);
          }
          if (entry.state === TodoEntryState.IN_PROGRESS.toString()) {
            this.inProgressState.push(entry);
          }
        });
      });
  }

}
