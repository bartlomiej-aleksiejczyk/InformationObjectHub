import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { InfoObjectService } from './services/infoobject.service';

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
  @Input() infoobjectLinks: string[] = [];
  @Input() todoContent: string = '';

  buttonText: string = 'Copy';

  isVisible: boolean = true;

  constructor(private infoObjectService: InfoObjectService) {}

  copyToClipboard(content: string) {
    navigator.clipboard.writeText(content).then(
      () => {
        console.log('Content copied!');
        this.buttonText = 'Copied!';
        setTimeout(() => (this.buttonText = 'Copy'), 1000);
      },
      (err) => console.error('Failed to copy: ', err)
    );
  }

  deleteInfoObject() {
    console.log(this.deleteUrl);
    if (this.deleteUrl) {
      this.infoObjectService
        .deleteInfoObject(this.deleteUrl)
        .then((success) => {
          if (success) {
            this.isVisible = false;
          } else {
            console.error('Failed to delete the object');
          }
        });
    }
  }
}
