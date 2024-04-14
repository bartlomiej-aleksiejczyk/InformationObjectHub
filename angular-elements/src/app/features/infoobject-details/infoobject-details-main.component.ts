import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { InfoObjectService } from './services/infoobject.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription, catchError, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-infoobject-details-main',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './infoobject-details-main.component.html',
  styleUrl: './infoobject-details-main.component.scss',
})
export class InfoobjectDetailsMainComponent {
  @Input() infoObjectId: string = '';
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
  deleteButtonText: string = 'Delete';

  isVisible: boolean = true;
  infoObjectForm: FormGroup;
  isEditable: boolean = false;
  isSaving: boolean = false;
  isDeleting: boolean = false;
  deleteError: string = '';

  constructor(private infoObjectService: InfoObjectService) {
    this.infoObjectForm = new FormGroup({
      content: new FormControl(''),
      topic: new FormControl(''),
      tag: new FormControl(''),
    });
  }

  toggleEdit(): void {
    this.isEditable = !this.isEditable;
    if (this.isEditable) {
      this.infoObjectForm.setValue({
        content: this.content,
        topic: this.topic,
        tag: this.tag,
      });
    }
  }

  cancelEdit(): void {
    this.isEditable = false;
  }

  saveChanges(): void {
    if (this.infoObjectForm.valid) {
      this.isSaving = true;
      this.infoObjectService
        .updateInfoObject(this.infoObjectId, this.infoObjectForm.value)
        .subscribe({
          next: (response) => {
            console.log('Update successful');
            this.toggleEdit();
            this.isSaving = false;
          },
          error: (error) => {
            console.error('Update failed', error);
            this.isSaving = false;
          },
        });
    }
  }

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
    const userConfirmed = confirm(
      'Are you sure you want to delete this Information Object?'
    );
    if (userConfirmed && this.deleteUrl) {
      this.isDeleting = true;
      this.deleteButtonText = 'Deleting...';
      this.deleteError = '';

      this.infoObjectService
        .deleteInfoObject(this.deleteUrl)
        .then((success) => {
          if (success) {
            this.isVisible = false;
          } else {
            this.deleteError = 'Failed to delete!';
            this.deleteButtonText = 'Delete';
          }
        })
        .catch((err) => {
          this.deleteError = 'Error: Could not delete';
          this.deleteButtonText = 'Delete';
        })
        .finally(() => {
          this.isDeleting = false;
        });
    }
  }
}
