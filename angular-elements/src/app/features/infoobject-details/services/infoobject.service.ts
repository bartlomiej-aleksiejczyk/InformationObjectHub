import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InfoObjectService {
  constructor(private http: HttpClient) {}

  async deleteInfoObject(url: string): Promise<boolean> {
    console.log('test');
    try {
      await firstValueFrom(
        this.http.delete<string>(url, { responseType: 'text' as 'json' })
      );
      return true;
    } catch (error) {
      console.error('Delete failed: ', error);
      return false;
    }
  }
}
