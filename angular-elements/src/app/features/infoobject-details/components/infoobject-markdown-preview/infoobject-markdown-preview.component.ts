import { Component, Input, OnInit } from '@angular/core';
import { MarkdownDisplayUtils } from '../../utils/MarkdownDisplayUtils';
import { CopyableContentWrapperComponent } from "../../../../shared/copyable-content-wrapper/copyable-content-wrapper.component";

@Component({
  selector: 'app-infoobject-markdown-preview',
  standalone: true,
  templateUrl: './infoobject-markdown-preview.component.html',
  styleUrl: './infoobject-markdown-preview.component.scss',
  imports: [CopyableContentWrapperComponent]
})
export class InfoobjectMarkdownPreviewComponent implements OnInit {
  @Input() markdownContent: string = '';
  renderedMarkdown: string = '';
  constructor() {
    console.log(this.markdownContent)

  }
  ngOnInit(): void {
    this.renderedMarkdown = MarkdownDisplayUtils.parseMarkdownToHTML(this.markdownContent)
    console.log(this.renderedMarkdown)

  }
}
