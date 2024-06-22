import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {

  public url: string = 'http://localhost:4200';

  constructor(private httpClient: HttpClient) { }

  saveToken(token: string) {
    return this.httpClient.post(`${this.url}/saveToken`, { token });
  }
}
