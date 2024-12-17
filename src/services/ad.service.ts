import { Injectable } from '@angular/core';
import { Ad } from '../models/ad.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environments';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdService {
  
  private adsSubject = new BehaviorSubject<Ad[]>([]);
  ads$: Observable<Ad[]> = this.adsSubject.asObservable();
  
  private apiUrl = `${environment.baseUrl}Ad`; 

  constructor(private http: HttpClient, private authService : AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken(); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`, 
      'Content-Type': 'application/json' 
    });
  }
  
  fetchAds(): void {
    this.http.get<Ad[]>(this.apiUrl).subscribe(ads => {
      this.adsSubject.next(ads); 
    });
  }

  addAd(ad: Ad): Observable<Ad> {
    return this.http.post<Ad>(this.apiUrl, ad, { headers: this.getHeaders() });
  }

  editAd(updatedAd: Ad): Observable<Ad> {
    return this.http.put<Ad>(`${this.apiUrl}/${updatedAd.id}`, updatedAd, { headers: this.getHeaders() });
  }

  deleteAd(adId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${adId}`, { headers: this.getHeaders() });
  }
  
}