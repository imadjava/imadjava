import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Experience } from '../models/experience.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ExperienceService {
  private apiUrl = `${environment.apiUrl}/api/v1/experiences`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Experience[]> {
    return this.http.get<Experience[]>(this.apiUrl);
  }

  getById(id: number): Observable<Experience> {
    return this.http.get<Experience>(`${this.apiUrl}/${id}`);
  }

  create(exp: Experience): Observable<Experience> {
    return this.http.post<Experience>(this.apiUrl, exp);
  }

  update(id: number, exp: Experience): Observable<Experience> {
    return this.http.put<Experience>(`${this.apiUrl}/${id}`, exp);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
