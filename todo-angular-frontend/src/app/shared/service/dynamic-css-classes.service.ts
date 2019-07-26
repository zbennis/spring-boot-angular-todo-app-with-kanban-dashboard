import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicCssClassesService {

  constructor() { }


  public markAsImportant(isImportant: boolean): string {
      return isImportant ? 'important' : '';
  }

}
