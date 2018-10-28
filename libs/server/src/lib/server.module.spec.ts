import { async, TestBed } from '@angular/core/testing';
import { ServerModule } from './server.module';

describe('ServerModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ServerModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ServerModule).toBeDefined();
  });
});
