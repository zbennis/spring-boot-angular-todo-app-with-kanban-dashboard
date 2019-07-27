import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../shared/service/authentication.service';
import {TodoHttpClientService} from '../shared/service/todo-http-client-service.service';
import {TodoEntryState} from '../shared/entity/TodoEntryState';
import {TodoEntry} from '../shared/entity/TodoEntry';
import {TriggerNotificationService} from '../shared/service/trigger-notification.service';
import {InternNotificationType} from '../shared/entity/InternNotificationType';
import {DynamicCssClassesService} from '../shared/service/dynamic-css-classes.service';
import {MatCardModule} from '@angular/material';
import {CdkDragDrop} from '@angular/cdk/typings/esm5/drag-drop';
import {CdkDragEnter, CdkDragExit, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-welcome',
  templateUrl: './kanban-dashboard.component.html',
  styleUrls: ['./kanban-dashboard.component.scss']
})
export class KanbanDashboardComponent implements OnInit {

  userName: string;

  // -------------------------
  ideaStateData: TodoEntry[] = [];
  todoStateData: TodoEntry[] = [];
  inProgressStateData: TodoEntry[] = [];
  doneStateData: TodoEntry[] = [];
  todoEntries: TodoEntry[];

  // -------------------------

  constructor(private loginService: AuthenticationService,
              private todoService: TodoHttpClientService,
              private triggerNotification: TriggerNotificationService,
              public dynamicCssClasses: DynamicCssClassesService ) {
  }

  ngOnInit() {
    this.getUserNameFromLoginService();
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
          if (entry.state === TodoEntryState.IDEA.toString()) {
            this.ideaStateData.push(entry);
          }
          if (entry.state === TodoEntryState.TODO.toString()) {
            this.todoStateData.push(entry);
          }
          if (entry.state === TodoEntryState.IN_PROGRESS.toString()) {
            this.inProgressStateData.push(entry);
          }
          if (entry.state === TodoEntryState.DONE.toString()) {
            this.doneStateData.push(entry);
          }
        });
      });
  }

  onDrop(event: CdkDragDrop<TodoEntry[]> ) {
    if (event.previousContainer === event.container) {
      // In this case the order does not matter
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log('Dragged item:');
      console.log('from -> ' + event.previousContainer.id);
      console.log('To ->' + event.container.id);
      transferArrayItem( event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

}
