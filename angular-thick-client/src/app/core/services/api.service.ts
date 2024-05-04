import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../enviroments/environment';
 
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
  ): Observable<any> {
    const url = `${this.baseUrl}/info-object?tag=${tag}&page=${page}&size=${size}`;
    return this.http.get(url).pipe(
      catchError((error) => {
        throw new Error('Failed to fetch info objects: ' + error);
      })
    );
  }

  createInfoObject(infoObject: any): Observable<any> {
    const url = `${this.baseUrl}/info-object`;
    return this.http.post(url, infoObject).pipe(
      catchError((error) => {
        throw new Error('Failed to create info object: ' + error);
      })
    );
  }

  updateInfoObject(id: number, infoObject: any): Observable<any> {
    const url = `${this.baseUrl}/info-object/${id}`;
    return this.http.put(url, infoObject).pipe(
      catchError((error) => {
        throw new Error('Failed to update info object: ' + error);
      })
    );
  }

  getUniqueTags(): Observable<any> {
    const url = `${this.baseUrl}/tags`
    return this.http.get(url).pipe(
      catchError((error) => {
        throw new Error('Failed to fetch tags: ' + error);
      })
    );
  }

  deleteInfoObject(id: number): Observable<any> {
    const url = `${this.baseUrl}/info-object/${id}`;
    return this.http.delete(url).pipe(
      catchError((error) => {
        throw new Error('Failed to delete info object: ' + error);
      })
    );
  }
}
