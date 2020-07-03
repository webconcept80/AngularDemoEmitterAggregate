import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  getUsers() {
    return this.http.get(environment.apiBaseUrl + '/users').pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  addUser(data): Observable<any> {
    return this.http.post(environment.apiBaseUrl + '/user', data);
  }

  updateUser(data): Observable<any> {
    return this.http
      .put(environment.apiBaseUrl + '/user/' + data._id, data, {
        headers: this.headers,
      })
      .pipe();
  }

  deleteUser(data): Observable<any> {
    return this.http
      .delete(environment.apiBaseUrl + '/user/' + data._id, {
        headers: this.headers,
      })
      .pipe();
  }

  getUserCount() {
    return this.http.get(environment.apiBaseUrl + '/user/count');
  }
}
