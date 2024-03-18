# PACT JS Example

Figuring out PACT JS with some very basic APIs built using `express` and `axios`.

Repository contains:

- 1 provider
- 2 consumers, each using a different API endpoint on the consumer

Based off of code from:

- <https://medium.com/@onejohi/building-a-simple-rest-api-with-nodejs-and-express-da6273ed7ca9>
- <https://axios-http.com/docs/example>

PACT Contract tests based on:

- <https://docs.pact.io/5-minute-getting-started-guide>
- <https://github.com/mdcruz/pact-js-example/blob/main/package.json>

## PACT Broker

Assumes a PACT broker running locally using DOCKER Compose

```CMD
docker compose build
docker compose up
```

## PACT Tests

Tests are executed using JEST.  To execute the tests:

```CMD
cd <broker or consumer folder>

npm run test
```

Consumers can publish a new contract:

```CMD
cd <consumer folder>

npm run publish:pact
```

Consumers will publish separate contracts for the same provider.

## To Do

- Investigate [Jest-Pact](https://www.npmjs.com/package/jest-pact)
- Fix versioning before publish.  `npm run publish:pact` failing to update version before publishing.
- Investigate why JEST command is not exiting gracefully.  Requiring `--force-exit`
