import { Test, TestingModule } from '@nestjs/testing';
import { DeploymentController } from './deployment.controller';

describe('Deployment Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [DeploymentController],
    }).compile();
  });
  it('should be defined', () => {
    const controller = module.get<DeploymentController>(DeploymentController);
    expect(controller).toBeDefined();
  });
});
