import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Testimonial } from '../models/testimonial.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TestimonialService {
  private apiUrl = `${environment.apiUrl}/api/v1/testimonials`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>(this.apiUrl);
  }

  getById(id: number): Observable<Testimonial> {
    return this.http.get<Testimonial>(`${this.apiUrl}/${id}`);
  }

  create(t: Testimonial): Observable<Testimonial> {
    return this.http.post<Testimonial>(this.apiUrl, t);
  }

  update(id: number, t: Testimonial): Observable<Testimonial> {
    return this.http.put<Testimonial>(`${this.apiUrl}/${id}`, t);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
