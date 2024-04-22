import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoobjectNewComponent } from './infoobject-new.component';

describe('InfoobjectNewComponent', () => {
  let component: InfoobjectNewComponent;
  let fixture: ComponentFixture<InfoobjectNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoobjectNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoobjectNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
