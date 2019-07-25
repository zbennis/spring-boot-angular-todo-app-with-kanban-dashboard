import {Component, OnInit} from '@angular/core';
import {TodoEntry} from '../shared/entity/TodoEntry';
import {TodoHttpClientService} from '../shared/service/todo-http-client-service.service';
import {AuthenticationService} from '../shared/service/authentication.service';
import {TodoEntryState} from '../shared/entity/TodoEntryState';
import {TriggerNotificationService} from '../shared/service/trigger-notification.service';
import {InternNotificationType} from '../shared/entity/InternNotificationType';
import { RouterModule} from '@angular/router';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss']
})
export class TodosListComponent implements OnInit {

  counter = 0;
  date = new Date();
  todoList: TodoEntry[];

  constructor(private todoHttpService: TodoHttpClientService,
              private authenticationService: AuthenticationService,
              private triggerNotification: TriggerNotificationService) {
  }

  ngOnInit() {
    this.getTodoEntriesForUser(this.authenticationService.getDecodedAuthenticatedUserIdentifier());
  }

  public deleteTodoEntry(userIdentifier: string, todoId: number) {
    console.log(`deleting todo entry id: ${todoId} for user -> ${userIdentifier}`);
    this.todoHttpService.deleteTodoEntry(userIdentifier, todoId).subscribe(() => {
      this.triggerNotification.triggerNotification(InternNotificationType.INFO, 'Entry deleted successfully', '', 5000);
      this.getTodoEntriesForUser(userIdentifier);
    });
  }

  public getBadgeClassByTodoEntryState(state: string): string {
    switch (state) {
      case TodoEntryState.IDEA.toString(): {
        return `#2acbeb`;
      }
      case TodoEntryState.TODO.toString(): {
        return '#e8471e';
      }
      case TodoEntryState.IN_PROGRESS.toString(): {
        return '#edaa1a';
      }
      case TodoEntryState.DONE.toString(): {
        return '#63cf42';
      }
      default: {
        return '#2acbeb';
      }
    }
  }

  public getDotClass(state: string): string {
    switch (state) {
      case TodoEntryState.IDEA.toString(): {
        return `dotIdea`;
      }
      case TodoEntryState.TODO.toString(): {
        return 'dotTodo';
      }
      case TodoEntryState.IN_PROGRESS.toString(): {
        return 'dotProgress';
      }
      case TodoEntryState.DONE.toString(): {
        return 'dotDone';
      }
      default: {
        return 'dotIdea';
      }
    }
  }

  private getTodoEntriesForUser(userIdentifier: string) {
    console.log('todo cmp => ' + userIdentifier);
    this.todoHttpService.getListOfTodoEntriesForUser(userIdentifier).pipe().subscribe(data => {
      this.todoList = data;
      if (this.todoList.length <= 0) {
        this.triggerNotification.triggerNotification(InternNotificationType.INFO, 'Todo bucket is now empty', '', 5000);
      }
    });
  }

  private generateRandomNumber(): number {
    return Math.floor(Math.random() * 10) + 1;
  }

  private buildTodoList(): void { // TODO remove fake data, was generated only to test the frontend
    this.date.setDate(this.date.getDay() + this.generateRandomNumber());
    this.todoList.push(new TodoEntry(++this.counter, 'Learn to code', new Date(), null, this.date, TodoEntryState.IDEA.toString(), 1));
    this.date = new Date();
    this.date.setDate(this.date.getDay() + this.generateRandomNumber());
    this.todoList.push(new TodoEntry(++this.counter, 'Learn to dance', new Date(), null, this.date, TodoEntryState.IDEA.toString(), 1));
    this.date = new Date();
    this.date.setDate(this.date.getDay() + this.generateRandomNumber());
    this.todoList.push(new TodoEntry(++this.counter, 'Learn to cook', new Date(), null, this.date, TodoEntryState.IDEA.toString(), 1));
    this.date = new Date();
    this.date.setDate(this.date.getDay() + this.generateRandomNumber());
    this.todoList.push(new TodoEntry(++this.counter, 'Learn to write', new Date(), null, this.date, TodoEntryState.IDEA.toString(), 1));
    this.date = new Date();
    this.date.setDate(this.date.getDay() + this.generateRandomNumber());
    this.todoList.push(new TodoEntry(++this.counter, 'Learn to sing', new Date(), null, this.date, TodoEntryState.IDEA.toString(), 1));
    this.date = new Date();
    this.date.setDate(this.date.getDay() + this.generateRandomNumber());
    this.todoList.push(new TodoEntry(++this.counter, 'Learn to learn', new Date(), null, this.date, TodoEntryState.IDEA.toString(), 1));
    this.date = new Date();
    this.date.setDate(this.date.getDay() + this.generateRandomNumber());
    this.todoList.push(new TodoEntry(++this.counter, 'Learn to smile', new Date(), null, this.date, TodoEntryState.IDEA.toString(), 1));
    this.date = new Date();
  }

}
