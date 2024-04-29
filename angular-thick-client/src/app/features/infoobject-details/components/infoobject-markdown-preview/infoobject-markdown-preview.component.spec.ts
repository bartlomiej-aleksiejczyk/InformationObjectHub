import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoobjectMarkdownPreviewComponent } from './infoobject-markdown-preview.component';

describe('InfoobjectMarkdownPreviewComponent', () => {
  let component: InfoobjectMarkdownPreviewComponent;
  let fixture: ComponentFixture<InfoobjectMarkdownPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoobjectMarkdownPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoobjectMarkdownPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
