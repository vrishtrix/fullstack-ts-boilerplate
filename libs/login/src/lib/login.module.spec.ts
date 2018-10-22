import { async, TestBed } from '@angular/core/testing';
import { LoginModule } from './login.module';

describe('LoginModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LoginModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LoginModule).toBeDefined();
  });
});
