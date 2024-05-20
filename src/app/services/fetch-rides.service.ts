import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FetchRidesService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  fetchRides(params: any): Observable<any> {
    const url = `${this.apiUrl}/rides/fetchRides`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add any other headers you need here
    });
console.log("PARAMS : " ,params)
    return this.http.post<any>(url, params, { headers });
  }
  updateRides(params: any): Observable<any> {
    const url = `${this.apiUrl}/rides/updateRides`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add any other headers you need here
    });
console.log("PARAMS : " ,params)
    return this.http.post<any>(url, params, { headers });
  }
}
