import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { InfoObjectService } from './services/infoobject.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription, catchError, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InfoobjectEditModalComponent } from './components/infoobject-edit-modal/infoobject-edit-modal.component';
import { Todo } from '../../core/models/todo';
import { InfoobjectTodoPreviewComponent } from './components/infoobject-todo-preview/infoobject-todo-preview.component';
import { MarkdownUtils } from './utils/MarkdownDownloadUtils';
import { CopyableContentWrapperComponent } from '../../shared/copyable-content-wrapper/copyable-content-wrapper.component';
import { MarkdownDisplayUtils } from './utils/MarkdownDisplayUtils';
import { InfoobjectMarkdownPreviewComponent } from "./components/infoobject-markdown-preview/infoobject-markdown-preview.component";

@Component({
  selector: 'app-infoobject-details-main',
  standalone: true,
  templateUrl: './infoobject-details-main.component.html',
  styleUrl: './infoobject-details-main.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InfoobjectEditModalComponent,
    InfoobjectTodoPreviewComponent,
    CopyableContentWrapperComponent,
    InfoobjectMarkdownPreviewComponent
  ]
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
  @Input() markdownContent: string = '';

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
    document.body.style.overflow = 'auto';
  }

  handleSave(updatedInfoObject: any): void {
    console.log('Received data to save:', updatedInfoObject);
  }

  downloadAsMarkdown() {
    const markdown = MarkdownUtils.formatAsMarkdown({
      authorIp: this.authorIp,
      topic: this.topic,
      content: this.content,
      tag: this.tag,
      todos: this.todos,
    });
    MarkdownUtils.downloadMarkdown(
      markdown,
      // TODO: Consider case of todo infoobject and markdown infoobject
      `${this.topic
        ? MarkdownUtils.getTitleFromTopic(this.topic)
        : MarkdownUtils.getTitleFromContent(this.content)
      }.md`
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
