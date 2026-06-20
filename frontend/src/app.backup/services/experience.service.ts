import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Experience {
  id?: number;
  companyName: string;
  designation: string;
  startDate?: string;
  endDate?: string;
  responsibilities?: string;
  achievements?: string;
}

@Injectable({ providedIn: 'root' })
export class ExperienceService {
  private base = '/api/v1/experiences';
  constructor(private http: HttpClient) {}

  list(): Observable<Experience[]> { return this.http.get<Experience[]>(this.base); }
  get(id: number) { return this.http.get<Experience>(`${this.base}/${id}`); }
  create(e: Experience) { return this.http.post<Experience>(this.base, e); }
  update(id: number, e: Experience) { return this.http.put<Experience>(`${this.base}/${id}`, e); }
  delete(id: number) { return this.http.delete(`${this.base}/${id}`); }
}

