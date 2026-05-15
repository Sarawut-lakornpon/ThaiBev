import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketRequest } from './ticket-request';

describe('TicketRequest', () => {
  let component: TicketRequest;
  let fixture: ComponentFixture<TicketRequest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketRequest],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketRequest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
