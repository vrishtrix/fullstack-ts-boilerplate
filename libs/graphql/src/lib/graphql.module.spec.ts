import { async, TestBed } from '@angular/core/testing';
import { GraphqlModule } from './graphql.module';

describe('GraphqlModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GraphqlModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(GraphqlModule).toBeDefined();
  });
});
