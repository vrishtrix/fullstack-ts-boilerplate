import { Controller, Get, Headers, Param } from '@nestjs/common';
import { Core_v1Api } from '@kubernetes/client-node';

@Controller('deployment')
export class DeploymentController {
  constructor(private readonly k8sApi: Core_v1Api) {}

  @Get(':deployment')
  async getDeployment(
    @Headers('namespace') namespace: string = 'default',
    @Param('deployment') deployment: string,
  ) {}

}
