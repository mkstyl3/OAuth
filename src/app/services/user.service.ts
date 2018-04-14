import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {RequestOptions} from '@angular/http';

@Injectable()
export class UserService {
  path = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {
  }

  googleOAuthInitService$(): Observable<any> {
    return this.http
      .get<any>(this.path + '/login/google/init');
  }

  helloService$(): Observable<any> {
    return this.http.get<any>(this.path + '/hello');
  }

  googleSignInCallback$(authResult): Observable<any> {
    return this.http.post(this.path + '/login/google/hello', authResult)
  }
}
