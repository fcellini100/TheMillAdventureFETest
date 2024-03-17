import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApplicationConfig, inject } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpHeaders } from '@angular/common/http';

// Obviously this should be stored elsewhere, like a vault.
// For the sake of simplicity, I'm hardcoding them here.
const uri =
  'https://api.takeshape.io/project/b8735585-0c57-4a02-9a65-5c7834921abb/production/graphql';
const bearer = `Bearer de473e6c8ad244b7b927c04992e690ed`;

export function apolloOptionsFactory(): ApolloClientOptions<unknown> {
  const httpLink = inject(HttpLink);
  return {
    link: httpLink.create({
      uri,
      headers: new HttpHeaders({
        Authorization: bearer,
      }),
    }),
    cache: new InMemoryCache(),
  };
}

export const graphqlProvider: ApplicationConfig['providers'] = [
  Apollo,
  {
    provide: APOLLO_OPTIONS,
    useFactory: apolloOptionsFactory,
  },
];
