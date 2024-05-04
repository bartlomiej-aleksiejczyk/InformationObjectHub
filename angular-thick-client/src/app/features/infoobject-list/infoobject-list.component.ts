import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { InfoobjectNewComponent } from '../infoobject-new/infoobject-new.component';
import { InfoobjectDetailsMainComponent } from '../infoobject-details/infoobject-details-main.component';

@Component({
  selector: 'app-infoobject-list',
  standalone: true,
  imports: [
    CommonModule, // Already included for structural directives
    FormsModule, // Needed for ngModel
    InfoobjectNewComponent, 
    InfoobjectDetailsMainComponent
  ],
  templateUrl: './infoobject-list.component.html',
  styleUrls: ['./infoobject-list.component.scss'] // Ensure this is styleUrls, not styleUrl
})
export class InfoobjectListComponent implements OnInit {
  infoObjects: any[] = [];
  uniqueTags: string[] = [];
  tagSearch: string = '';
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  lastReloadTime: Date = new Date(); // Define lastReloadTime

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchInfoObjects();
    this.fetchUniqueTags();
  }

  fetchInfoObjects(): void {
    this.apiService.getInfoObjects(this.tagSearch, this.currentPage, this.pageSize).subscribe({
      next: (page) => {
        this.infoObjects = page.content;
        this.totalPages = page.totalPages;
        this.lastReloadTime = new Date(); // Update lastReloadTime on data fetch
      },
      error: (error) => console.error('Failed to fetch info objects:', error)
    });
  }

  fetchUniqueTags(): void {
    this.apiService.getUniqueTags().subscribe({
      next: (tags) => this.uniqueTags = tags,
      error: (error) => console.error('Failed to fetch tags:', error)
    });
  }

  onSearch(): void {
    this.currentPage = 0; // Reset to first page for new searches
    this.fetchInfoObjects();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.fetchInfoObjects();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.fetchInfoObjects();
    }
  }
}
