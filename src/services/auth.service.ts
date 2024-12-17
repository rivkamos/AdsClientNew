import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.baseUrl}Auth`; 
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signin`, user).pipe(
      tap(response => {
        if (response.token) {
          this.storeToken(response.token); 
          this.setCurrentUser(response.user); 
        }
      })
    );
  }

  signup(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, user).pipe(
        tap(response => {
          if (response.token) {
            this.storeToken(response.token); 
            this.setCurrentUser(response.user); 
          }
        })
      );
  }

  logout(): void {
    this.setCurrentUser(null); // Update currentUser to null
    localStorage.removeItem('authToken'); 
  }

  setCurrentUser(user: User | null): void {
    this.currentUserSubject.next(user); // Emit the new user value
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable(); // Return observable of currentUser
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null; // Check the current value
  }

  getToken(): string | null {
    return localStorage.getItem('authToken'); 
  }

  storeToken(token: string): void {
    localStorage.setItem('authToken', token); 
  }
}
