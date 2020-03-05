import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {KanbanDashboardComponent} from './kanban-dashboard/kanban-dashboard.component';
import {LoginComponent} from './login/login.component';
import {ErrorComponent} from './error/error.component';
import {TodosListComponent} from './todos-list/todos-list.component';
import {NavigationComponent} from './navigation/navigation.component';
import {FooterComponent} from './footer/footer.component';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LogoutComponent} from './logout/logout.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TodoAddEditComponent} from './todo-add-edit/todo-add-edit.component';
import {SignupPageComponent} from './signup-page/signup-page.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {HttpRequestInterceptorService} from './shared/service/http-request-interceptor.service';
import {MatButtonToggleModule, MatCard, MatCardModule} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ConnectionErrorComponent } from './connection-error/connection-error.component';

@NgModule({
  declarations: [
    AppComponent,
    KanbanDashboardComponent,
    LoginComponent,
    ErrorComponent,
    TodosListComponent,
    NavigationComponent,
    FooterComponent,
    LogoutComponent,
    TodoAddEditComponent,
    SignupPageComponent,
    ConnectionErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    HttpClientModule,
    NgbModule,
    RouterModule,
    MatCardModule,
    DragDropModule,
    MatButtonToggleModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptorService , multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
