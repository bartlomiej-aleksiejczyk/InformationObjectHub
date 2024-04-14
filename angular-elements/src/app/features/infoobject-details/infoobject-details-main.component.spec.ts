import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoobjectDetailsMainComponent } from './infoobject-details-main.component';

describe('InfoobjectDetailsMainComponent', () => {
  let component: InfoobjectDetailsMainComponent;
  let fixture: ComponentFixture<InfoobjectDetailsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoobjectDetailsMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoobjectDetailsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
