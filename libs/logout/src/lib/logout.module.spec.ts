import { async, TestBed } from '@angular/core/testing';
import { LogoutModule } from './logout.module';

describe('LogoutModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LogoutModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LogoutModule).toBeDefined();
  });
});
