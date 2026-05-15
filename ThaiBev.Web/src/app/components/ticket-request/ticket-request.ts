import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { QueueService } from '../../services/queue';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-ticket-request',
  standalone: true,
  imports: [NgIf],
  templateUrl: './ticket-request.html',
  styleUrls: ['./ticket-request.css']
})
export class TicketRequest {
  private queueService = inject(QueueService);
  private router = inject(Router);
  isLoading = false;

  getTicket() {
    this.isLoading = true;
    this.queueService.getTicket().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.router.navigate(['/ticket', res.ticketNumber], { 
          queryParams: { issuedAt: res.issuedAt } 
        });
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error getting ticket', err);
        alert('Could not connect to the API. Please ensure the backend is running.');
      }
    });
  }

  goToClear() {
    this.router.navigate(['/clear']);
  }
}
