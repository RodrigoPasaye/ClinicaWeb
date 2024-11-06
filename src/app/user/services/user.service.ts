import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login } from '../interfaces/login';
import { Observable } from 'rxjs';
import { Sesion } from '../interfaces/sesion';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = environment.apiUrl + "User/"

  constructor( private http: HttpClient) { }

  iniciarSesion(request: Login):Observable<Sesion> {
    return this.http.post<Sesion>(`${this.baseUrl}Login`, request);
  }
}
