import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketClear } from './ticket-clear';

describe('TicketClear', () => {
  let component: TicketClear;
  let fixture: ComponentFixture<TicketClear>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketClear],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketClear);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
