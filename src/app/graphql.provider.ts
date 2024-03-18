import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { ApplicationConfig } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';

// Obviously this should be stored elsewhere, like a vault.
// For the sake of simplicity, I'm hardcoding them here.
const uri =
  'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cltx7827j000008jtbn7adc0h/master';

export function apolloOptionsFactory(): ApolloClientOptions<unknown> {
  return {
    uri: uri,
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
