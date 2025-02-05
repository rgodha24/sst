/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "aws-rust-lambda",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const lambda = new sst.aws.Function("rust", {
      runtime: "rust",
      handler: "./",
      url: true,
      architecture: "arm64",
    });

    return { url: lambda.url };
  },
});
