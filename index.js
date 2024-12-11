const {
  CopilotRuntime,
  copilotRuntimeNodeExpressEndpoint,
  OpenAIAdapter,
} = require("@copilotkit/runtime");
require("dotenv").config();
const express = require("express");
const app = express();

app.listen(9000, () => {
  console.log("Server running on 9000");
});

const serviceAdapter = new OpenAIAdapter({ model: "gpt-4o-mini" });

app.use("/copilotkit", (req, res, next) => {
  const runtime = new CopilotRuntime();
  const handler = copilotRuntimeNodeExpressEndpoint({
    runtime,
    serviceAdapter,
    endpoint: "/copilotkit",
  });

  return handler(req, res, next);
});

app.get("/", (req, res) => {
  res.send("Hello world");
});
