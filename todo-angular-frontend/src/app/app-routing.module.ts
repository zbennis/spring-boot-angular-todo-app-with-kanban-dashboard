import {ErrorComponent} from './error/error.component';
import {KanbanDashboardComponent} from './kanban-dashboard/kanban-dashboard.component';
import {LoginComponent} from './login/login.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TodosListComponent} from './todos-list/todos-list.component';
import {LogoutComponent} from './logout/logout.component';
import {RouteGuardsService} from './shared/service/route-guards.service';
import {TodoAddEditComponent} from './todo-add-edit/todo-add-edit.component';
import {SignupPageComponent} from './signup-page/signup-page.component';
import {ConnectionErrorComponent} from './connection-error/connection-error.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signUp', component: SignupPageComponent},
  {path: 'logout', component: LogoutComponent, canActivate: [RouteGuardsService]},
  {path: 'welcome/:name', component: KanbanDashboardComponent, canActivate: [RouteGuardsService]},
  {path: 'todos/:userIdentifier', component: TodosListComponent, canActivate: [RouteGuardsService]},
  {path: 'todos/:userIdentifier/new', component: TodoAddEditComponent, canActivate: [RouteGuardsService]},
  {path: 'todos/:userIdentifier/:todoId', component: TodoAddEditComponent, canActivate: [RouteGuardsService]},
  {path: 'connectionError', component: ConnectionErrorComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
