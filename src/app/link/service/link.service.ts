import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Link } from '../model/link.model';
import { CreateLinkRequest } from '../model/create-link.model';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  private apiUrl = 'https://localhost:7086/api/link';

  constructor(private http: HttpClient) { }

  generateShortUrl(request: CreateLinkRequest): Observable<{ message?: string, shortenUrl: string }> {
    return this.http.post<{ message?: string, shortenUrl: string }>(`${this.apiUrl}/createshorturl`, request);
  }
}
