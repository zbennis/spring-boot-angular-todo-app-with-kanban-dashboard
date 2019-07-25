import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {AuthenticationService} from './authentication-service.service';
import {token} from '../constants/Constants';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestInterceptorService implements  HttpInterceptor{

  constructor(private authenticationService:AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders : {
        Authorization : this.authenticationService.getAuthenticatedToken()
      }
    });
    return next.handle(req);
  }
}
