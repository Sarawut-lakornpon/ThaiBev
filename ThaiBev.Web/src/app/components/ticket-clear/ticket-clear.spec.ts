import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketClear } from './ticket-clear';
import { QueueService } from '../../services/queue';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('TicketClear', () => {
  let component: TicketClear;
  let fixture: ComponentFixture<TicketClear>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketClear],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Router, useValue: { navigate: () => {} } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TicketClear);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
