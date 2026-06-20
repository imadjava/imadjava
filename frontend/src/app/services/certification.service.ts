import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Certification } from '../models/certification.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CertificationService {
  private apiUrl = `${environment.apiUrl}/api/v1/certifications`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Certification[]> {
    return this.http.get<Certification[]>(this.apiUrl);
  }

  getById(id: number): Observable<Certification> {
    return this.http.get<Certification>(`${this.apiUrl}/${id}`);
  }

  create(cert: Certification): Observable<Certification> {
    return this.http.post<Certification>(this.apiUrl, cert);
  }

  update(id: number, cert: Certification): Observable<Certification> {
    return this.http.put<Certification>(`${this.apiUrl}/${id}`, cert);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
