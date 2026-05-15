import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TicketResponse {
  ticketNumber: string;
  issuedAt: string;
}

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QueueService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getTicket(): Observable<TicketResponse> {
    return this.http.post<TicketResponse>(`${this.apiUrl}/ticket`, {});
  }

  getCurrentQueue(): Observable<TicketResponse> {
    return this.http.get<TicketResponse>(`${this.apiUrl}/current`);
  }

  clearQueue(): Observable<TicketResponse> {
    return this.http.post<TicketResponse>(`${this.apiUrl}/clear`, {});
  }
}
