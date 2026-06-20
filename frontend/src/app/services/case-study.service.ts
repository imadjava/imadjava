import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CaseStudy } from '../models/case-study.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CaseStudyService {
  private apiUrl = `${environment.apiUrl}/api/v1/case-studies`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<CaseStudy[]> {
    return this.http.get<CaseStudy[]>(this.apiUrl);
  }

  getByIndustry(industry: string): Observable<CaseStudy[]> {
    return this.http.get<CaseStudy[]>(`${this.apiUrl}/industry/${industry}`);
  }

  getById(id: number): Observable<CaseStudy> {
    return this.http.get<CaseStudy>(`${this.apiUrl}/${id}`);
  }

  create(cs: CaseStudy): Observable<CaseStudy> {
    return this.http.post<CaseStudy>(this.apiUrl, cs);
  }

  update(id: number, cs: CaseStudy): Observable<CaseStudy> {
    return this.http.put<CaseStudy>(`${this.apiUrl}/${id}`, cs);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
