import { HttpException, HttpStatus } from '@nestjs/common';

export class FetchNamespaceException extends HttpException {
  constructor(namespace: string) {
    super(
      `Namespace [${namespace}]: couldn't be fetched`,
      HttpStatus.NOT_FOUND,
    );
  }
}