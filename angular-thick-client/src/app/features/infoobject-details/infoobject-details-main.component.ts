import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InfoobjectEditModalComponent } from './components/infoobject-edit-modal/infoobject-edit-modal.component';
import { Todo } from '../../core/models/todo.model';
import { InfoobjectTodoPreviewComponent } from './components/infoobject-todo-preview/infoobject-todo-preview.component';
import { MarkdownUtils } from './utils/markdown-download-utils';
import { CopyableContentWrapperComponent } from '../../shared/components/copyable-content-wrapper/copyable-content-wrapper.component';
import { InfoobjectMarkdownPreviewComponent } from './components/infoobject-markdown-preview/infoobject-markdown-preview.component';
import { CommonModule } from '@angular/common';
import { InfoobjectStoreService } from '../../core/services/infoobject-store-service';
import { InfoobjectRequest } from '../../core/models/infoobject-request.model';

@Component({
  selector: 'app-infoobject-details-main',
  standalone: true,
  templateUrl: './infoobject-details-main.component.html',
  styleUrls: ['./infoobject-details-main.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InfoobjectEditModalComponent,
    InfoobjectTodoPreviewComponent,
    CopyableContentWrapperComponent,
    InfoobjectMarkdownPreviewComponent,
  ],
})
export class InfoobjectDetailsMainComponent implements OnInit {
  @Input() infoobjectId: (number | null) = null;
  @Input() content: string = '';
  @Input() topic: string = '';
  @Input() authorIp: string = '';
  @Input() tag: string = '';
  @Input() dialogueContent: string = '';
  @Input() infoobjectLinks: string[] = [];
  @Input() todoContentList: (Todo[] | null) = null;
  @Input() markdownContent: string = '';

  deleteButtonText: string = 'Delete';

  todos: Todo[] = [];
  isVisible: boolean = true;
  isEditable: boolean = false;
  isSaving: boolean = false;
  isDeleting: boolean = false;
  deleteError: string = '';
  isEditModalOpen: boolean = false;

  constructor(private infoobjectStoreService: InfoobjectStoreService) {}

  ngOnInit(): void {
    this.parsetodoContentList();
  }

  parsetodoContentList(): void {
    if (this.todoContentList) {
      try {
        this.todos = (this.todoContentList);
      } catch (error) {
        console.error('Error parsing todoContentList:', error);
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

  handleSave(updatedInfoObject: InfoobjectRequest): void {
    console.log('Received data to save:', updatedInfoObject);
    if (!this.infoobjectId) return 
    this.infoobjectStoreService.updateInfoObject(this.infoobjectId, updatedInfoObject).subscribe({
      next: () => console.log('Update successful'),
      error: (error: any) => console.error('Update failed:', error)
    });
  }

  downloadAsMarkdown() {
    const markdown = MarkdownUtils.formatAsMarkdown({
      authorIp: this.authorIp,
      topic: this.topic,
      content: this.content,
      tag: this.tag,
      todos: this.todos,
      markdownContent: this.markdownContent,
    });
    MarkdownUtils.downloadMarkdown(
      markdown,
      `${this.topic ? MarkdownUtils.getTitleFromTopic(this.topic) : MarkdownUtils.getTitleFromContent(this.content)}.md`
    );
  }

  deleteInfoObject() {
    const userConfirmed = confirm('Are you sure you want to delete this Information Object?');
    if (userConfirmed) {
      this.isDeleting = true;
      this.deleteButtonText = 'Deleting...';
      this.deleteError = '';

      this.infoobjectStoreService.deleteInfoObject(Number(this.infoobjectId)).subscribe({
        next: () => {
          this.isVisible = false;
          console.log('Delete successful');
        },
        error: (error: any) => {
          this.deleteError = 'Error: Could not delete';
          this.deleteButtonText = 'Delete';
          console.error('Delete failed:', error);
        },
        complete: () => this.isDeleting = false
      });
    }
  }
}
