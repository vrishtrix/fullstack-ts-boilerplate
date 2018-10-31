/*import { Resolver } from '@nestjs/graphql';
import { Core_v1Api, V1Namespace } from '@kubernetes/client-node';
import { CreateNamespaceException, FetchNamespaceException } from './exceptions';
import { Utils } from '../util';

@Resolver('Namespace')
export class NamespaceResolver {
  constructor(private readonly k8sApi: Core_v1Api) {}

  @Get(':namespace')
  async getListedNamespacedPod(
    @Param('namespace') namespace: string,
  ) {
    try {
      return await Utils.getBody(this.k8sApi.readNamespace(namespace));
    } catch {
      throw new FetchNamespaceException(namespace);
    }
  }

  @Delete(':namespace')
  async deleteNamespace(
    @Param(':namespace') namespace: string,
  ) {
    return await this.k8sApi.deleteNamespace(namespace);
  }

  @Put(':namespace')
  async createNamespace(
    @Param('namespace') namespace: string,
  ) {
    try {
      return await this.k8sApi.createNamespace(<V1Namespace>{
        metadata: {
          name: namespace,
        },
      });
    } catch {
      throw new CreateNamespaceException(namespace);
    }
  }

}*/