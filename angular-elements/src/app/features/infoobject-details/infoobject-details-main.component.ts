import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-infoobject-details-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './infoobject-details-main.component.html',
  styleUrl: './infoobject-details-main.component.scss',
})
export class InfoobjectDetailsMainComponent {
  @Input() deleteUrl: string = '';
  @Input() editUrl: string = '';
  @Input() content: string = '';
  @Input() topic: string = '';
  @Input() authorIp: string = '';
  @Input() tag: string = '';
  @Input() dialogueContent: string = '';
  @Input() infoObjectLinks: string[] = [];
  @Input() todoContent: string = '';

  copyToClipboard(content: string) {
    navigator.clipboard.writeText(content).then(
      () => console.log('Content copied!'),
      (err) => console.error('Failed to copy: ', err)
    );
  }

  deleteInfoObject() {
    // Perform HTTP DELETE request or handle via parent component
    console.log('Delete URL: ', this.deleteUrl);
  }
}