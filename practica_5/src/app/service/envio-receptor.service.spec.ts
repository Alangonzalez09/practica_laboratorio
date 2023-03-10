import { TestBed } from '@angular/core/testing';

import { EnvioReceptorService } from './envio-receptor.service';

describe('EnvioReceptorService', () => {
  let service: EnvioReceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvioReceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
