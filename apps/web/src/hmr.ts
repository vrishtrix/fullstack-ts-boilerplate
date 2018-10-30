/// <reference types="webpack-env" />
import { ApplicationRef, NgModuleRef } from '@angular/core';
import { createNewHosts } from '@angularclass/hmr';

export async function hmrBootstrap<T>(bootstrap: () => Promise<NgModuleRef<T>>) {
  module.hot.accept();

  const ngModule = await bootstrap();

  module.hot.dispose(() => {
    const appRef = ngModule.injector.get<ApplicationRef>(ApplicationRef);
    const elements = appRef.components.map(
      cur => cur.location.nativeElement,
    );
    const makeVisible = createNewHosts(elements);

    ngModule.destroy();
    makeVisible();
  });
}
