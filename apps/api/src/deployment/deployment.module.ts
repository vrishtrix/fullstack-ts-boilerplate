import { Module } from '@nestjs/common';
import { DeploymentController } from './deployment.controller';
import { CommonModule } from '../common.module';

@Module({
  imports: [CommonModule],
  controllers: [DeploymentController]
})
export class DeploymentModule {}
