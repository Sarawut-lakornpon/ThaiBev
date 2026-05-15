import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QueueService } from '../../services/queue';
import { NgIf, DatePipe } from '@angular/common';

@Component({
  selector: 'app-ticket-clear',
  imports: [NgIf, DatePipe],
  templateUrl: './ticket-clear.html',
  styleUrls: ['./ticket-clear.css']
})
export class TicketClear implements OnInit {
  private queueService = inject(QueueService);
  private router = inject(Router);
  isLoading = false;
  isLoadingCurrent = true;
  currentNumber: string | null = null;
  currentIssuedAt: string | null = null;
  clearedNumber: string | null = null;

  ngOnInit() {
    this.queueService.getCurrentQueue().subscribe({
      next: (res) => {
        this.isLoadingCurrent = false;
        this.currentNumber = res.ticketNumber;
        this.currentIssuedAt = res.issuedAt;
      },
      error: (err) => {
        this.isLoadingCurrent = false;
        console.error('Error fetching current queue', err);
        this.currentNumber = '--';
      }
    });
  }

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
