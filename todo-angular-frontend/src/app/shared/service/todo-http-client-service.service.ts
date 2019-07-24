import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {TodoEntry} from '../entity/TodoEntry';

@Injectable({
  providedIn: 'root'
})
export class TodoHttpClientService {

  private api: string = `/api/`;

  constructor(private httpClient: HttpClient) {
  }


  public getAllTasks(): Observable<TodoEntry[]> {
    return this.httpClient.get<TodoEntry[]>(this.api + 'todos');
  }

  public deleteTodoEntry(userIdentifier: string, todoId: number): Observable<any> {
    return this.httpClient.delete(this.api + `todos/${userIdentifier}/${todoId}`);
  }

  public authenticateUser(userName: string, password: string) {
    //this.httpClient.get<Observable<User>>(this.api+``)
  }


  public getListOfTodoEntriesForUser(userIdentifier: string): Observable<TodoEntry[]> {
    console.log("todo service => " + userIdentifier);
    return this.httpClient.get<TodoEntry[]>(this.api + `todos/${userIdentifier}`);
  }

  public getTodoEntryById(todoId: number): Observable<TodoEntry> {
    console.log("getting todo of -> " + todoId);
    if (todoId !== -1 && todoId !== 0) {
      return this.httpClient.get<TodoEntry>(this.api + `todos/edit/${todoId}`);
    }
    return EMPTY;
  }

  // todoEntry the TodoEntry we are going to add or update
  // method true -> create, false −> update
  public createUpdateTodoEntry(todoEntry: TodoEntry, method: boolean, userIdentifier: string): Observable<TodoEntry> {
    const url = this.api + `todos/${userIdentifier}/edit/${method ? 1 : 0}`;
    console.log(url);
    console.log("Creating/updating -> " + todoEntry.description + " of user -> " + userIdentifier);
    return this.httpClient.put<TodoEntry>(url, todoEntry);
  }

  public getListOfTodoEntryStates(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.api + `todos/types`);
  }
}
