import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TicketResponse {
  ticketNumber: string;
  issuedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class QueueService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5059/api/queue'; // Default Web API port

  getTicket(): Observable<TicketResponse> {
    return this.http.post<TicketResponse>(`${this.apiUrl}/ticket`, {});
  }

  clearQueue(): Observable<TicketResponse> {
    return this.http.post<TicketResponse>(`${this.apiUrl}/clear`, {});
  }
}
