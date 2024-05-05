import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { InfoobjectRequest } from '../models/infoobject-request.model';
import { InfoObjectResponse } from '../models/infoobject-response.model';

@Injectable({
  providedIn: 'root'
})
export class InfoobjectStoreService {
  private infoobjectsSubject = new BehaviorSubject<InfoObjectResponse[]>([]);
  private uniqueTagsSubject = new BehaviorSubject<string[]>([]);
  private totalPagesSubject = new BehaviorSubject<number>(0);
  private currentPage = 0;
  private pageSize = 10;

  public readonly infoObjects$ = this.infoobjectsSubject.asObservable();
  public readonly uniqueTags$ = this.uniqueTagsSubject.asObservable();
  public readonly totalPages$ = this.totalPagesSubject.asObservable();

  constructor(private apiService: ApiService) {}

  fetchInfoObjects(tagSearch: string = '', page?: number): void {
    if (page !== undefined) {
      this.currentPage = page;
    }
    this.apiService.getInfoObjects(tagSearch, this.currentPage, this.pageSize).subscribe({
      next: (page) => {
        this.infoobjectsSubject.next(page.content);
        this.totalPagesSubject.next(page.totalPages);
      },
      error: (error) => console.error('Failed to fetch info objects:', error)
    });
  }

  jumpToPage(pageNumber: number): void {
    this.fetchInfoObjects('', pageNumber);
  }

  fetchUniqueTags(): void {
    this.apiService.getUniqueTags().subscribe({
      next: (tags) => this.uniqueTagsSubject.next(tags),
      error: (error) => console.error('Failed to fetch tags:', error)
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPagesSubject.value - 1) {
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

  createInfoObject(infoObject: InfoobjectRequest): Observable<InfoObjectResponse> {
    return this.apiService.createInfoObject(infoObject).pipe(
      tap((newInfoObject) => {
        const currentInfoObjects = this.infoobjectsSubject.value;
        this.infoobjectsSubject.next([...currentInfoObjects, newInfoObject]);
      }),
      catchError((error) => {
        console.error('Failed to create info object:', error);
        return throwError(() => new Error(error.message));
      })
    );
}



updateInfoObject(id: number, infoObject: InfoobjectRequest): Observable<InfoObjectResponse> {
  return this.apiService.updateInfoObject(id, infoObject).pipe(
    tap((updatedInfoObject) => {
      console.log(updatedInfoObject)
      const currentInfoObjects = this.infoobjectsSubject.value;
      const index = currentInfoObjects.findIndex(item => item.id === updatedInfoObject.id);
      if (index !== -1) {
        const updatedInfoObjects = [
          ...currentInfoObjects.slice(0, index),
          updatedInfoObject,
          ...currentInfoObjects.slice(index + 1)
        ];
        this.infoobjectsSubject.next(updatedInfoObjects);
      console.log(this.infoobjectsSubject.value)
      }
    }),
    catchError((error) => {
      console.error('Failed to update info object:', error);
      return throwError(() => new Error('Failed to update info object: ' + error.message));
    })
  );
}


  deleteInfoObject(id: number): Observable<any> {
    return this.apiService.deleteInfoObject(id).pipe(
      tap(() => this.fetchInfoObjects()),
      catchError((error) => {
        throw new Error('Failed to delete info object: ' + error.message);
      })
    );
  }
}
