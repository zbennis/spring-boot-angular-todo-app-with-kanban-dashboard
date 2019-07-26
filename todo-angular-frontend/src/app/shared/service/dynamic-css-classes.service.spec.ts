import { TestBed } from '@angular/core/testing';

import { DynamicCssClassesService } from './dynamic-css-classes.service';

describe('DynamicCssClassesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DynamicCssClassesService = TestBed.get(DynamicCssClassesService);
    expect(service).toBeTruthy();
  });
});
