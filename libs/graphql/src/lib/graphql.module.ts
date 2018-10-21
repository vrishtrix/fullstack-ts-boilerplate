import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { setContext } from 'apollo-link-context';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Apollo, ApolloModule } from 'apollo-angular';

@NgModule({
  imports: [CommonModule, ApolloModule, HttpLinkModule]
})
export class GraphqlModule {
  constructor(apollo: Apollo, httpLink: HttpLink, localStorage: LocalStorage) {
    const cache = new InMemoryCache();
    const http = httpLink.create({
      uri: 'http://localhost:3000',
      withCredentials: true
    });

    const auth = setContext(async (_, headers) => {
      const token = await localStorage.getItem<string>('token').toPromise();

      if (!token) return {};

      return {
        headers: headers.append('Authorization', `Bearer ${token}`)
      };
    });

    apollo.create({
      link: auth.concat(http),
      cache
    });
  }
}
