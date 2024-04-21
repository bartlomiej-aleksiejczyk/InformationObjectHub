import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { InfoObjectService } from './services/infoobject.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription, catchError, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InfoobjectEditModalComponent } from './components/infoobject-edit-modal/infoobject-edit-modal.component';
import { Todo } from '../../shared/models/todo';
import { InfoobjectTodoPreviewComponent } from './components/infoobject-todo-preview/infoobject-todo-preview.component';

@Component({
  selector: 'app-infoobject-details-main',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InfoobjectEditModalComponent, InfoobjectTodoPreviewComponent],
  templateUrl: './infoobject-details-main.component.html',
  styleUrl: './infoobject-details-main.component.scss',
})
export class InfoobjectDetailsMainComponent implements OnInit {
  @Input() infoobjectId: string = '';
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

  todos: Todo[] = [];
  isVisible: boolean = true;
  isEditable: boolean = false;
  isSaving: boolean = false;
  isDeleting: boolean = false;
  deleteError: string = '';
  isEditModalOpen: boolean = false;

  constructor(private infoObjectService: InfoObjectService) { }

  ngOnInit(): void {
    this.parseTodoContent();
  }

  parseTodoContent(): void {
    if (this.todoContent) {
      try {
        this.todos = JSON.parse(this.todoContent);
        console.log(this.todos);
      } catch (error) {
        console.error('Error parsing todoContent:', error);
      }
    }
  }

  openEditModal(): void {
    this.isEditModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    document.body.style.overflow = 'auto'; // Enable scroll on body
  }

  handleSave(updatedInfoObject: any): void {
    console.log('Received data to save:', updatedInfoObject);
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
