import { Module } from '@nestjs/common';

// import { NamespaceResolver } from './namespace.resolver';
import { CommonModule } from '../common.module';

@Module({
  imports: [CommonModule],
  // controllers: [NamespaceResolver],
})
export class NamespaceModule {}