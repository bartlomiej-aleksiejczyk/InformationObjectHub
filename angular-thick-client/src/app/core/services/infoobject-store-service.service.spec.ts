import { TestBed } from '@angular/core/testing';

import { InfoobjectStoreServiceService } from './infoobject-store-service';

describe('InfoobjectStoreServiceService', () => {
  let service: InfoobjectStoreServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoobjectStoreServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
