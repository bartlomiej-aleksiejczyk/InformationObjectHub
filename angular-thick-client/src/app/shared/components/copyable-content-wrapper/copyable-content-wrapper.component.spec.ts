import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyableContentWrapperComponent } from './copyable-content-wrapper.component';

describe('CopyableContentWrapperComponent', () => {
  let component: CopyableContentWrapperComponent;
  let fixture: ComponentFixture<CopyableContentWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopyableContentWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CopyableContentWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
