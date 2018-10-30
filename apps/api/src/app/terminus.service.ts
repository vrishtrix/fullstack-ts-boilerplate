import { TerminusModuleOptions, TerminusOptionsFactory } from '@brunnerlivio/terminus';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TerminusService implements TerminusOptionsFactory {
  createTerminusOptions(): TerminusModuleOptions {
    return {
      onSignal: this.onSignal,
      onShutdown: this.onShutdown,
      logger: console.log,
      signal: 'SIGTERM',
      healthChecks: {
        '/health': this.health,
      },
    };
  }

  async onSignal() {
    console.log('1. on Signal');
  }

  async onShutdown() {
    console.log('2. on Shutdown');
  }

  async health() {
    return true;
  }
}
