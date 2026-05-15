import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketRequest } from './ticket-request';
import { QueueService } from '../../services/queue';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('TicketRequest', () => {
  let component: TicketRequest;
  let fixture: ComponentFixture<TicketRequest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketRequest],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Router, useValue: { navigate: () => {} } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TicketRequest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
