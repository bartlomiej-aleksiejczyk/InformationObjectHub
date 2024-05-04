import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoobjectListComponent } from './infoobject-list.component';

describe('InfoobjectListComponent', () => {
  let component: InfoobjectListComponent;
  let fixture: ComponentFixture<InfoobjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoobjectListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoobjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
