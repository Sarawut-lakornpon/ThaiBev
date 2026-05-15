import { Routes } from '@angular/router';
import { TicketRequest } from './components/ticket-request/ticket-request';
import { TicketDisplay } from './components/ticket-display/ticket-display';
import { TicketClear } from './components/ticket-clear/ticket-clear';

export const routes: Routes = [
  { path: 'request', component: TicketRequest },
  { path: 'ticket/:number', component: TicketDisplay },
  { path: 'clear', component: TicketClear },
  { path: '', redirectTo: '/request', pathMatch: 'full' },
  { path: '**', redirectTo: '/request' }
];
