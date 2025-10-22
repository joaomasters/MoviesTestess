
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
    
  })
  export class MovieService {
    private baseUrl = 'http://localhost:8080/api/movies';
  
    constructor(private http: HttpClient) {}
  
    getAllMovies(year?: number, winner?: boolean): Observable<any> {
        let url = `${this.baseUrl}`;
        const params: string[] = [];
      
        if (year) params.push(`year=${year}`);
        if (winner !== undefined) params.push(`winner=${winner}`);
      
        if (params.length > 0) {
          url += `?${params.join('&')}`;
        }
      
        return this.http.get(url);
      }
      
    getIntervals(): Observable<any> {
      return this.http.get(`${this.baseUrl}/intervals`);
    }
  
    getYearsWithMultipleWinners(): Observable<any> {
      return this.http.get(`${this.baseUrl}/years-with-multiple-winners`);
    }
  
    getStudiosWithWinCount(): Observable<any> {
      return this.http.get(`${this.baseUrl}/studios-with-win-count`);
    }
  
    getWinnersByYear(year: number): Observable<any> {
      return this.http.get(`${this.baseUrl}/winners-by-year/${year}`);
    }
  }
  
