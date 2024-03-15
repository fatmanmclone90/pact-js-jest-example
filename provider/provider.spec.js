const Verifier = require("@pact-foundation/pact").Verifier;
const { app } = require("./provider.js");
const process = require("process");

const port = 3002;

const testApp = app.listen(port, () => {
    console.log(`Provider service listening on http://localhost:${port}`);
});

const options = {
    provider: "ProductsAPI", // must match that specified by consumer
    providerBaseUrl: `http://localhost:${port}`,
    // pactUrls: [pactFile], // if you don't use a broker
    pactBrokerUrl: "http://localhost:9292",
    publishVerificationResult: true,
    providerVersionBranch: process.env.GIT_BRANCH ?? "main",
    providerVersion: process.env.npm_package_version,
    consumerVersionSelectors: [
        { mainBranch: true },
        { latest: true }, // what is the correct way to fetch the expected version
    ]
};

describe("Pact Verification", () => {
  test("should validate the expectations of the Consumer", () => {
    return new Verifier(options)
      .verifyProvider()
      .then((output) => {
        console.log("Pact Verification Complete!");
        console.log(output);
      })
      .catch((e) => {
        console.error("Pact verification failed :(", e);
        testApp.close();
      });
  });
});