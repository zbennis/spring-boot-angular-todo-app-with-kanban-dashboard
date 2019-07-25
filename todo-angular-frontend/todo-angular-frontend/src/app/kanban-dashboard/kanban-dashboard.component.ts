import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../shared/service/authentication-service.service';
import {TodoHttpClientService} from '../shared/service/todo-http-client-service.service';
import {TodoEntryState} from '../shared/entity/TodoEntryState';
import {TodoEntry} from '../shared/entity/TodoEntry';

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
              private todoService: TodoHttpClientService) {
  }

  ngOnInit() {
    let userName = this.loginService.getDecodedAuthenticatedUserIdentifier();
    this.divideList();
  }


  private divideList() {
    this.todoService.getListOfTodoEntriesForUser(this.loginService.getDecodedAuthenticatedUserIdentifier())//
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
