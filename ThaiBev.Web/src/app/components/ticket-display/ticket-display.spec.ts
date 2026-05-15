import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDisplay } from './ticket-display';

describe('TicketDisplay', () => {
  let component: TicketDisplay;
  let fixture: ComponentFixture<TicketDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketDisplay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
