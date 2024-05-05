import { Component, OnInit } from '@angular/core';
import { InfoobjectStoreService } from '../../core/services/infoobject-store-service';
import { InfoObjectResponse } from '../../core/models/infoobject-response.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CopyableContentWrapperComponent } from '../../shared/components/copyable-content-wrapper/copyable-content-wrapper.component';
import { InfoobjectEditModalComponent } from '../infoobject-details/components/infoobject-edit-modal/infoobject-edit-modal.component';
import { InfoobjectMarkdownPreviewComponent } from '../infoobject-details/components/infoobject-markdown-preview/infoobject-markdown-preview.component';
import { InfoobjectTodoPreviewComponent } from '../infoobject-details/components/infoobject-todo-preview/infoobject-todo-preview.component';
import { InfoobjectDetailsMainComponent } from '../infoobject-details/infoobject-details-main.component';

@Component({
  standalone: true,
  selector: 'app-infoobject-list',
  templateUrl: './infoobject-list.component.html',
  styleUrls: ['./infoobject-list.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InfoobjectEditModalComponent,
    InfoobjectTodoPreviewComponent,
    CopyableContentWrapperComponent,
    InfoobjectMarkdownPreviewComponent,
    InfoobjectDetailsMainComponent  ],
})
export class InfoobjectListComponent implements OnInit {
  infoObjects: InfoObjectResponse[] = [];
  uniqueTags: string[] = [];
  currentPage: number = 0;
  totalPages: number = 0;
  lastReloadTime: Date = new Date();
  
  constructor(private infoobjectStoreService: InfoobjectStoreService) {}

  ngOnInit(): void {
    this.infoobjectStoreService.infoObjects$.subscribe(objects => this.infoObjects = objects);
    this.infoobjectStoreService.totalPages$.subscribe(pages => this.totalPages = pages);
    this.infoobjectStoreService.uniqueTags$.subscribe(tags => this.uniqueTags = tags);

    this.infoobjectStoreService.fetchInfoObjects();
    this.infoobjectStoreService.fetchUniqueTags();
  }

  firstPage(): void {
    this.infoobjectStoreService.jumpToPage(0);
  }

  lastPage(): void {
    this.infoobjectStoreService.jumpToPage(this.totalPages - 1);
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.infoobjectStoreService.jumpToPage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.infoobjectStoreService.jumpToPage(this.currentPage + 1);
    }
  }
}
