import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactRequest } from '../models/contact-request.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private apiUrl = `${environment.apiUrl}/api/v1/contact-requests`;

  constructor(private http: HttpClient) {}

  submit(data: Partial<ContactRequest>): Observable<ContactRequest> {
    return this.http.post<ContactRequest>(`${this.apiUrl}/submit`, data);
  }

  getAll(): Observable<ContactRequest[]> {
    return this.http.get<ContactRequest[]>(this.apiUrl);
  }

  getUnprocessed(): Observable<ContactRequest[]> {
    return this.http.get<ContactRequest[]>(`${this.apiUrl}/unprocessed`);
  }

  markProcessed(id: number): Observable<ContactRequest> {
    return this.http.post<ContactRequest>(`${this.apiUrl}/${id}/mark-processed`, {});
  }

  getById(id: number): Observable<ContactRequest> {
    return this.http.get<ContactRequest>(`${this.apiUrl}/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
