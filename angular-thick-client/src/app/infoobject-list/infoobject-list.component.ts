import { Component, OnInit } from '@angular/core';
import { InfoobjectStoreService } from '../core/services/infoobject-store-service';

@Component({
  standalone: true,
  selector: 'app-infoobject-list',
  templateUrl: './infoobject-list.component.html',
  styleUrls: ['./infoobject-list.component.scss']
})
export class InfoobjectListComponent implements OnInit {
  infoObjects: any[] = [];
  uniqueTags: string[] = [];
  currentPage: number = 0;
  totalPages: number = 0;

  constructor(private infoobjectStoreService: InfoobjectStoreService) {}

  ngOnInit(): void {
    this.infoobjectStoreService.infoObjects$.subscribe(objects => this.infoObjects = objects);
    this.infoobjectStoreService.totalPages$.subscribe(pages => this.totalPages = pages);
    this.infoobjectStoreService.uniqueTags$.subscribe(tags => this.uniqueTags = tags);

    this.infoobjectStoreService.fetchInfoObjects();
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
