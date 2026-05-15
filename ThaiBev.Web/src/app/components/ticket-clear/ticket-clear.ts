import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { QueueService } from '../../services/queue';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-ticket-clear',
  imports: [NgIf],
  templateUrl: './ticket-clear.html',
  styleUrls: ['./ticket-clear.css']
})
export class TicketClear {
  private queueService = inject(QueueService);
  private router = inject(Router);
  isLoading = false;
  clearedNumber: string | null = null;

  clearQueue() {
    this.isLoading = true;
    this.queueService.clearQueue().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.clearedNumber = res.ticketNumber; // Will be "00"
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error clearing queue', err);
        alert('Could not connect to the API.');
      }
    });
  }

  goBack() {
    this.router.navigate(['/request']);
  }
}
