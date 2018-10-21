import { KubeConfig } from '@kubernetes/client-node';

export class K8sConfig {
  public static create() {
    const kc = new KubeConfig();
    kc.loadFromFile(require.resolve('@kubic/config/kubeconfig.yml'));
    return kc;
  }
}
