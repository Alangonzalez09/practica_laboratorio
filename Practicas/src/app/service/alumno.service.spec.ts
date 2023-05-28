import { TestBed } from '@angular/core/testing';

import { AlumnoService } from '../../../.angular/ionic-basic/src/app/service/alumno.service';

describe('AlumnoService', () => {
  let service: AlumnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlumnoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
