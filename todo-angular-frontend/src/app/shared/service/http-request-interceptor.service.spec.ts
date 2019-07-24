import { TestBed } from '@angular/core/testing';

import { HttpRequestInterceptorService } from './http-request-interceptor.service';

describe('HttpRequestInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpRequestInterceptorService = TestBed.get(HttpRequestInterceptorService);
    expect(service).toBeTruthy();
  });
});
