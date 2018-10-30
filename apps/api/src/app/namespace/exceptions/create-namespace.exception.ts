import { HttpException, HttpStatus } from '@nestjs/common';

export class CreateNamespaceException extends HttpException {
  constructor(namespace: string) {
    super(
      `Namespace [${namespace}]: couldn't be created`,
      HttpStatus.BAD_REQUEST,
    );
  }
}