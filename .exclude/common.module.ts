import { Module } from '@nestjs/common';
import { Attach, Core_v1Api, Exec, KubeConfig, Watch } from '@kubernetes/client-node';
import { K8sConfig } from './k8s-config.service';
import { PortForward } from '@kubernetes/client-node/dist/portforward';

@Module({
  exports: [
    Core_v1Api,
    Watch,
    Attach,
    Exec,
    PortForward,
  ],
  providers: [
    {
      provide: KubeConfig,
      useValue: K8sConfig.create(),
    },
    {
      provide: Core_v1Api,
      useFactory: (kc: KubeConfig) => kc.makeApiClient(Core_v1Api),
      inject: [KubeConfig],
    },
    {
      provide: Watch,
      useFactory: (kc: KubeConfig) => new Watch(kc),
      inject: [KubeConfig],
    },
    {
      provide: Attach,
      useFactory: (kc: KubeConfig) => new Attach(kc),
      inject: [KubeConfig],
    },
    {
      provide: Exec,
      useFactory: (kc: KubeConfig) => new Exec(kc),
      inject: [KubeConfig],
    },
    {
      provide: PortForward,
      useFactory: (kc: KubeConfig) => new PortForward(kc),
      inject: [KubeConfig],
    },
  ]
})
export class CommonModule {}
