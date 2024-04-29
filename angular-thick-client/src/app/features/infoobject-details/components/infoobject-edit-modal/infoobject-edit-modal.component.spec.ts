import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoobjectEditModalComponent } from './infoobject-edit-modal.component';

describe('InfoobjectEditModalComponent', () => {
  let component: InfoobjectEditModalComponent;
  let fixture: ComponentFixture<InfoobjectEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoobjectEditModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoobjectEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
