import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-copyable-content-wrapper',
  standalone: true,
  imports: [],
  templateUrl: './copyable-content-wrapper.component.html',
  styleUrl: './copyable-content-wrapper.component.scss',
})
export class CopyableContentWrapperComponent {
  @Input() copyData: string = '';
  @Input() contentType: string = 'Not Specified';

  buttonText: string = 'Copy';

  constructor() {}

  copyToClipboard() {
    navigator.clipboard.writeText(this.copyData).then(
      () => {
        console.log('Content copied!');
        this.buttonText = 'Copied!';
        setTimeout(() => (this.buttonText = 'Copy'), 1000);
      },
      (err) => console.error('Failed to copy: ', err)
    );
  }
}
