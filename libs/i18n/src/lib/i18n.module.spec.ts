import { async, TestBed } from '@angular/core/testing';
import { I18nModule } from './i18n.module';

describe('I18nModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(I18nModule).toBeDefined();
  });
});
