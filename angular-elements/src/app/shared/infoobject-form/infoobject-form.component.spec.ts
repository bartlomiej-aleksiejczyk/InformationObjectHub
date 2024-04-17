import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoobjectFormComponent } from './infoobject-form.component';

describe('InfoobjectFormComponent', () => {
  let component: InfoobjectFormComponent;
  let fixture: ComponentFixture<InfoobjectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoobjectFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoobjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
