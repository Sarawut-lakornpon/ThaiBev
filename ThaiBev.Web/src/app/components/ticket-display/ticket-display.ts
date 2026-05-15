import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ticket-display',
  templateUrl: './ticket-display.html'
})
export class TicketDisplay implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  ticketNumber = '';

  ngOnInit() {
    this.ticketNumber = this.route.snapshot.paramMap.get('number') || '';
  }

  goBack() {
    this.router.navigate(['/request']);
  }
}
