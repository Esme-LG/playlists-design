import { TestBed } from '@angular/core/testing';

import { SpotifyAccountService } from './spotify-account.service';

describe('SpotifyAccountService', () => {
  let service: SpotifyAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotifyAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
