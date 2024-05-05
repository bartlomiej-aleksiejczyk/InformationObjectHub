import { TestBed } from '@angular/core/testing';

import { InfoobjectStoreService } from './infoobject-store-service';

describe('InfoobjectStoreServiceService', () => {
  let service: InfoobjectStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoobjectStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
