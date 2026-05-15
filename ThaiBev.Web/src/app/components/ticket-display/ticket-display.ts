import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-ticket-display',
  standalone: true,
  imports: [DatePipe, NgIf],
  templateUrl: './ticket-display.html',
  styleUrls: ['./ticket-display.css']
})
export class TicketDisplay implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  ticketNumber = '';
  issuedAt: string | null = null;

  ngOnInit() {
    this.ticketNumber = this.route.snapshot.paramMap.get('number') || '';
    
    // Get issuedAt from history state (passed from TicketRequest)
    // If accessed directly and state is missing, it will remain null
    const navState = history.state;
    this.issuedAt = navState?.issuedAt || null;
  }

  goBack() {
    this.router.navigate(['/request']);
  }
}
