import { async, TestBed } from '@angular/core/testing';
import { TransferStateModule } from './transfer-state.module';

describe('TransferStateModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TransferStateModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TransferStateModule).toBeDefined();
  });
});
