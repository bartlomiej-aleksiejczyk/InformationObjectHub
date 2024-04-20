import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoobjectTodoPreviewComponent } from './infoobject-todo-preview.component';

describe('InfoobjectTodoPreviewComponent', () => {
  let component: InfoobjectTodoPreviewComponent;
  let fixture: ComponentFixture<InfoobjectTodoPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoobjectTodoPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoobjectTodoPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
