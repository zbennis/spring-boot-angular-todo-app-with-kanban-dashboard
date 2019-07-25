import {TestBed} from '@angular/core/testing';

import {TodoHttpClientService} from './todo-http-client-service.service';

describe('TaskHttpServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodoHttpClientService = TestBed.get(TodoHttpClientService);
    expect(service).toBeTruthy();
  });
});
