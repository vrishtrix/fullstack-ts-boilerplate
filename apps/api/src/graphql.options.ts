import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';

export class GraphqlOptions implements GqlOptionsFactory {
  private getTypePaths(prefix: string, paths: string[]) {
    return paths.map(path =>
      require.resolve(`@kubic/schemas/${prefix}/${path}.graphql`),
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
      typePaths: this.getTypePaths(
        'app',
        [
          'mutations/user-mutation',
          'user.graphql',
          'auth-payload.graphql',
        ],
      ),
    };
  }
}
