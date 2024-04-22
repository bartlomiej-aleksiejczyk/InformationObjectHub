import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyableSnippetComponent } from './copyable-snippet.component';

describe('CopyableSnippetComponent', () => {
  let component: CopyableSnippetComponent;
  let fixture: ComponentFixture<CopyableSnippetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopyableSnippetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CopyableSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
