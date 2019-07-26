import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TodoHttpClientService} from '../shared/service/todo-http-client-service.service';
import {todoId, userIdentifier} from '../shared/constants/Constants';
import {TodoEntry} from '../shared/entity/TodoEntry';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../shared/service/authentication.service';
import {TriggerNotificationService} from '../shared/service/trigger-notification.service';
import {Location} from '@angular/common';
import {InternNotificationType} from '../shared/entity/InternNotificationType';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-add-edit.component.html',
  styleUrls: ['./todo-add-edit.component.scss']
})
export class TodoAddEditComponent implements OnInit {

  defaultState = 'Choose a state';
  todoEntryStateEntries!: Observable<string[]>;
  private userIdentifier: string;
  private todoId = -1;
  todoEntry!: TodoEntry;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private todoHttpService: TodoHttpClientService,
              private authenticatedService: AuthenticationService,
              private triggerNotification: TriggerNotificationService) {
  }

  ngOnInit() {
    if (!this.todoEntry) {
      this.todoEntry = new TodoEntry(-1, '', new Date(), null, null, null, false, 0);
    }
    this.userIdentifier = this.route.snapshot.paramMap.get(userIdentifier);
    this.todoId = +this.route.snapshot.paramMap.get(todoId);
    this.getTodoEntryById();
    this.getTodoEntriesStatesToStringArray();
  }

  cancel() {
    this.router.navigate([`/todos/${this.userIdentifier}`]);
  }

  addUpdateTodoEntry() {
    this.isCreateMode() ? console.log('Trying to add a new entry -> ' + this.todoEntry) : //
      console.log('Trying to update an existing todo entry -> ' + this.todoEntry);
    // update or add a new todo
    this.authenticatedService.getDecodedAuthenticatedUserIdentifier().subscribe( inUserName => {
      this.todoHttpService.createUpdateTodoEntry( this.todoEntry, this.isCreateMode(), inUserName)
        .subscribe(() => {
          const message = this.isCreateMode() ? 'Todo entry added successfully' : 'Todo entry updated successfully';
          this.triggerNotification.triggerNotification(InternNotificationType.SUCCESS, message, '', 5000);
          this.location.back();
        });
    });



    console.log('After create/update');
    // navigate to the todo list
  }

  isCreateMode(): boolean {
    if (this.todoEntry) {
      return this.todoEntry.id === -1 || this.todoEntry.id === 0;
    }
    return this.todoId === -1 || this.todoId === 0;
  }

  private getTodoEntryById() {
    this.todoHttpService.getTodoEntryById(this.todoId).subscribe(entry => this.todoEntry = entry);
  }

  private getTodoEntriesStatesToStringArray() {
    this.todoEntryStateEntries = this.todoHttpService.getListOfTodoEntryStates();
  }

}
