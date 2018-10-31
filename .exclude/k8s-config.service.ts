import { KubeConfig } from '@kubernetes/client-node';
import * as path  from 'path';

export class K8sConfig {
  public static create() {
    const kc = new KubeConfig();
    kc.loadFromFile(path.join(process.cwd(), '.deploy', 'kubeconfig.yml'));
    return kc;
  }
}
