import { Component, Input, OnInit } from '@angular/core';
import { MarkdownDisplayUtils } from '../../utils/markdown-display-utils';
import { CopyableContentWrapperComponent } from '../../../../shared/components/copyable-content-wrapper/copyable-content-wrapper.component';
import { SafeHtmlPipe } from '../../../../shared/pipes/safe-html/safe-html.pipe';

@Component({
  selector: 'app-infoobject-markdown-preview',
  standalone: true,
  templateUrl: './infoobject-markdown-preview.component.html',
  styleUrl: './infoobject-markdown-preview.component.scss',
  imports: [CopyableContentWrapperComponent, SafeHtmlPipe],
})
export class InfoobjectMarkdownPreviewComponent implements OnInit {
  @Input() markdownContent: string = '';
  renderedMarkdown: string = '<br/>';

  ngOnInit(): void {
    this.renderedMarkdown = MarkdownDisplayUtils.parseMarkdownToHTML(
      this.markdownContent
    );
  }
}
