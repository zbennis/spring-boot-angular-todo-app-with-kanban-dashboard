import {Injectable, OnInit} from '@angular/core';
import {EMPTY, generate, interval, Observable, of} from 'rxjs';
import {token, userIdentifierSessionItemName} from '../constants/Constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() {
  }

  authenticate(userIdentifier: string, password: string) {
    console.log('before is logged ->' + this.isUserLoggedIn());
    if (userIdentifier === 'test' && password === 'test') {
      sessionStorage.setItem(userIdentifierSessionItemName, window.btoa(userIdentifier));
      sessionStorage.setItem(token, this.generateBasicAuthenticationCredential(userIdentifier, password));
      console.log('after is logged -> ' + this.isUserLoggedIn());
      return true;
    }
    return false;
  }

  getAuthenticatedToken() {
    return sessionStorage.getItem(token);
  }

  public generateBasicAuthenticationCredential(pseudo: string, password: string) {
    const headers = `Basic ${ window.btoa(pseudo + ':' + password) }`;
    return headers;
  }

  playWithObservable() {
    interval(5000).subscribe(() => this.isUserLoggedIn() ? console.log(`logged user ${this.getAuthenticatedUserIdentifier()}`)  //
     : 'no user is logged in');
  }

  isUserLoggedIn(): boolean {
    return sessionStorage.getItem(userIdentifierSessionItemName) !== null;
  }

  logout() {
    if (this.isUserLoggedIn()) {
      sessionStorage.removeItem(userIdentifierSessionItemName);
      sessionStorage.removeItem(token);
    }
  }

  getAuthenticatedUserIdentifier(): string | undefined {
    return this.isUserLoggedIn() ? sessionStorage.getItem(userIdentifierSessionItemName) : undefined;
  }

  getDecodedAuthenticatedUserIdentifier(): Observable<string> {
    return this.isUserLoggedIn() ? of(window.atob(sessionStorage.getItem(userIdentifierSessionItemName))) : EMPTY;
  }

}
