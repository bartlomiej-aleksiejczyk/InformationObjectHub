import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import hljs from 'highlight.js';
import { HtmlAttributeSerializer } from '../../utils/HtmlAttributeSerializer';

@Component({
  selector: 'app-copyable-snippet',
  standalone: true,
  imports: [],
  templateUrl: './copyable-snippet.component.html',
  styleUrl: './copyable-snippet.component.scss',
})
export class CopyableSnippetComponent implements OnInit, AfterViewInit {
  @Input() codeSnippet: string = '';
  @Input() language: string = 'plaintext';

  copyButtonText: string = 'Copy code';
  deserializedCode: string = '';

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    console.log('snippet', this.codeSnippet);

    this.deserializedCode = HtmlAttributeSerializer.deserialize(
      this.codeSnippet
    );
  }

  ngAfterViewInit(): void {
    this.applyHighlight();
  }

  applyHighlight() {
    this.elementRef.nativeElement
      .querySelectorAll('pre code')
      .forEach((block: HTMLElement) => {
        hljs.highlightBlock(block);
      });
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.deserializedCode).then(
      () => {
        this.copyButtonText = 'Code copied!';
        setTimeout(() => (this.copyButtonText = 'Copy code'), 1000);
      },
      (err) => console.error('Failed to copy: ', err)
    );
  }
}
