import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { QueueService } from './queue';

describe('QueueService', () => {
  let service: QueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QueueService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(QueueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
