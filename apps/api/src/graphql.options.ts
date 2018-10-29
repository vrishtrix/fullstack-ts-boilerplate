import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';

export class GraphqlOptions implements GqlOptionsFactory {
  private getSchemaPaths(paths: string[]) {
    return paths.map(path =>
      require.resolve(`@kubic/schemas/${path}.graphql`),
    );
  }

  createGqlOptions(): GqlModuleOptions {
    return {
      context: ({ req }: any) => ({ req }),
      path: '/graphql',
      installSubscriptionHandlers: false,
      resolverValidationOptions: {
        requireResolversForResolveType: false,
      },
      definitions: {
        path: require.resolve('@kubic/schemas/app/index.ts'),
        outputAs: 'interface',
      },
      typePaths: this.getSchemaPaths([
        'shared/enums',
        'app/mutations',
        'app/queries',
        'app/auth-payload',
        'app/user'
      ]),
    };
  }
}
