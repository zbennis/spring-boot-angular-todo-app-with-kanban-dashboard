import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../shared/service/authentication.service';
import {TodoHttpClientService} from '../shared/service/todo-http-client-service.service';
import {TodoEntryState} from '../shared/entity/TodoEntryState';
import {TodoEntry} from '../shared/entity/TodoEntry';
import {TriggerNotificationService} from '../shared/service/trigger-notification.service';
import {InternNotificationType} from '../shared/entity/InternNotificationType';
import {DynamicCssClassesService} from '../shared/service/dynamic-css-classes.service';
import {CdkDragDrop} from '@angular/cdk/typings/esm5/drag-drop';
import {moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

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
    this.clearStateDataArrays();
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

  private clearStateDataArrays() {
    this.ideaStateData = [];
    this.todoStateData = [];
    this.inProgressStateData = [];
    this.doneStateData = [];
  }

  onDrop(event: CdkDragDrop<TodoEntry[]> ) {
    if (event.previousContainer === event.container) {
      // In this case the order does not matter
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem( event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.mergeDroppedItemToDatabase(event.container.id);
    }
  }

  private mergeDroppedItemToDatabase(droppedTo: string) {
    if (droppedTo === 'cdk-drop-list-0') { // ideaStateData
      console.log('Dropping to -> ' + TodoEntryState.IDEA.toString());
      const foreignEntry = this.ideaStateData.filter(entry => entry.state.toString() !== TodoEntryState.IDEA.toString())[0];
      this.updateEntry(foreignEntry, TodoEntryState.IDEA);
    } else if (droppedTo === 'cdk-drop-list-1') { // todoStateData
      console.log('Dropping to -> ' + TodoEntryState.TODO.toString());
      const foreignEntry = this.todoStateData.filter(entry => entry.state.toString() !== TodoEntryState.TODO.toString())[0];
      this.updateEntry(foreignEntry, TodoEntryState.TODO);
    } else if (droppedTo === 'cdk-drop-list-2') { // inProgressStateData
      console.log('Dropping to -> ' + TodoEntryState.IN_PROGRESS.toString());
      const foreignEntry = this.inProgressStateData.filter(entry => entry.state.toString() !== TodoEntryState.IN_PROGRESS.toString())[0];
      this.updateEntry(foreignEntry, TodoEntryState.IN_PROGRESS);
    } else if (droppedTo === 'cdk-drop-list-3') { // doneStateData
      console.log('Dropping to -> ' + TodoEntryState.DONE.toString());
      const foreignEntry = this.doneStateData.filter(entry => entry.state.toString() !== TodoEntryState.DONE.toString())[0];
      this.updateEntry(foreignEntry, TodoEntryState.DONE);
    }
  }

  private updateEntry(entry: TodoEntry, newState: TodoEntryState) {
    if (entry !== null) {
      entry.state = newState.toString();
      this.todoService.createUpdateTodoEntry(entry, false, this.userName).subscribe(() => {
        //this.getUserNameFromLoginService();
        console.log('entry updated successfully...');
      });
    }
  }

}
