import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketDisplay } from './ticket-display';
import { ActivatedRoute } from '@angular/router';

describe('TicketDisplay', () => {
  let component: TicketDisplay;
  let fixture: ComponentFixture<TicketDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketDisplay],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'number' ? 'A5' : null)
              },
              queryParamMap: {
                get: (key: string) => (key === 'issuedAt' ? '2026-05-15T10:00:00Z' : null)
              }
            }
          }
        }
      ]
    }).compileComponents();

    history.pushState({ issuedAt: '2026-05-15T10:00:00Z' }, '', '');

    fixture = TestBed.createComponent(TicketDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct ticket number', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.ticket-number')?.textContent).toContain('A5');
  });


  it('should display the formatted date', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const dateText = compiled.querySelector('.info-area')?.textContent;
    expect(dateText).toContain('15/05/2026');
  });
});
