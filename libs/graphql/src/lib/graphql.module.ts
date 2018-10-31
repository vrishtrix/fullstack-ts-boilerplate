import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Apollo, ApolloModule } from 'apollo-angular';
import { Store } from '@ngxs/store';
import { AuthState } from '@foretag/auth';

@NgModule({
  imports: [
    CommonModule,
    ApolloModule,
    HttpLinkModule,
  ],
})
export class GraphqlModule implements OnInit {
  constructor(
    private readonly apollo: Apollo,
    private readonly httpLink: HttpLink,
    private readonly store: Store,
  ) {}

  ngOnInit() {
    const cache = new InMemoryCache();
    const http = this.httpLink.create({
      uri: 'http://localhost:3000/graphql',
      withCredentials: true,
    });

    const auth = setContext((_, { headers }) => {
      const jwtToken = this.store.selectSnapshot(AuthState.jwtToken);
      const csrfToken = this.store.selectSnapshot(AuthState.csrfToken);

      return {
        ...headers,
        'Origin': 'http://localhost:4200',
        'Authorization': `Bearer ${jwtToken}`,
        'X-XSRF-Token': csrfToken,
      };
    });

    this.apollo.create({
      link: auth.concat(http),
      cache,
    });
  }
}
