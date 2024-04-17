import { TestBed } from '@angular/core/testing';

import { InfoobjectFormStoreService } from './infoobject-form-store.service';

describe('InfoobjectFormStoreService', () => {
  let service: InfoobjectFormStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoobjectFormStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
