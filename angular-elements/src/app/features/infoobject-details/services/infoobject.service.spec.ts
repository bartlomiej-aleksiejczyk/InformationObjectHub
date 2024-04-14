import { TestBed } from '@angular/core/testing';

import { InfoObjectService } from './infoobject.service';

describe('InfoObjectService', () => {
  let service: InfoObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoObjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
