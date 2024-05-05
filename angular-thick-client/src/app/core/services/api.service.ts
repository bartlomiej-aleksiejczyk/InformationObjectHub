import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InfoobjectRequest } from '../models/infoobject-request.model';
import { InfoObjectResponse } from '../models/infoobject-response.model';
import { environment } from '../../../enviroments/environment';
import { PaginatedResponse } from '../models/paginated-response.model';
import { TagResponse } from '../models/tag-response.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getInfoObjects(
    tag?: string,
    page: number = 0,
    size: number = 10
  ): Observable<PaginatedResponse<InfoObjectResponse>> {
    const url = `${this.baseUrl}/info-object?tag=${tag}&page=${page}&size=${size}`;
    return this.http.get<PaginatedResponse<InfoObjectResponse>>(url).pipe(
      catchError((error) => throwError(() => new Error('Failed to fetch info objects: ' + error)))
    );
  }

  createInfoObject(infoObject: InfoobjectRequest): Observable<InfoObjectResponse> {
    const url = `${this.baseUrl}/info-object`;
    return this.http.post<InfoObjectResponse>(url, infoObject).pipe(
      catchError((error) => throwError(() => new Error('Failed to create info object: ' + error.message)))
    );
  }

  updateInfoObject(id: number, infoObject: InfoobjectRequest): Observable<InfoObjectResponse> {
    const url = `${this.baseUrl}/info-object/${id}`;
    return this.http.put<InfoObjectResponse>(url, infoObject).pipe(
      catchError((error) => throwError(() => new Error('Failed to update info object: ' + error)))
    );
  }

  getUniqueTags(): Observable<TagResponse> {
    const url = `${this.baseUrl}/tags`
    return this.http.get<TagResponse>(url).pipe(
      catchError((error) => throwError(() => new Error('Failed to fetch tags: ' + error)))
    );
  }

  deleteInfoObject(id: number): Observable<void> {
    const url = `${this.baseUrl}/info-object/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError((error) => throwError(() => new Error('Failed to delete info object: ' + error.message)))
    );
  }
}
