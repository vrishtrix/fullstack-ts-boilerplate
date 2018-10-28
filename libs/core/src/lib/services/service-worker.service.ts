import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { environment } from '@kubic/env/web';

@Injectable(<any>{ // wtf?
  providedIn: 'root',
})
export class ServiceWorkerService {
  constructor(private readonly swUpdate: SwUpdate) {}

  public async checkSWUpdate(): void {
    if (environment.production) {
      this.swUpdate.available.subscribe(() => {
        if (window.confirm('A new version has been released. Do you want to update?')) {
          window.location.reload(true);
        }
        // modal here?
      });

      await this.swUpdate.checkForUpdate();
    }
  }
}
