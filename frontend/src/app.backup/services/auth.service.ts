import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  isAuthenticated$ = this.isAuthenticated.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post('/api/v1/auth/login', { username, password })
      .pipe(tap((res: any) => {
        localStorage.setItem('token', res.token);
        this.isAuthenticated.next(true);
      }));
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post('/api/v1/auth/register', { username, password });
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated.next(false);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}

