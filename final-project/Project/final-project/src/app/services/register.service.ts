import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  _url = "http://localhost:3000/register";

  constructor(private _httpClient: HttpClient ) { }
  register(userData) {
    return this._httpClient.post<any>(this._url, userData);
  }
}
