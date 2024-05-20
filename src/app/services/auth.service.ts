import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://16.16.68.2:8080';

  constructor(private http: HttpClient) { }

  getUserDetails(params: any): Observable<any> {
    const url = `${this.apiUrl}/user/registerUser`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add any other headers you need here
    });
console.log("PARAMS : " ,params)
    return this.http.post<any>(url, params, { headers });
  }

  loginUser(params: any): Observable<any> {
    const url = `${this.apiUrl}/user/loginUser`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add any other headers you need here
    });
console.log("PARAMS : " ,params)
    return this.http.post<any>(url, params, { headers });
  }

  checkjwt(params:any): Observable<any> 
  {
    const url = `${this.apiUrl}/user/checkjwt`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add any other headers you need here
    });
      return this.http.post<any>(url, params, { headers });
  }
}
